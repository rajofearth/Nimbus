import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getFileIcon } from "@/components/file-browser/file-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { createRequest } from "@/web/hooks/createRequest";
import { useRequest } from "@/web/hooks/useRequest";
import { Button } from "@/components/ui/button";
import type { FileItem } from "@/web/lib/types";
import { parseError } from "@/web/utils/error";
import { Loader } from "@/components/loader";
import { Folder, X } from "lucide-react";
import { useEffect } from "react";

interface FolderContentItem extends FileItem {
	path?: string;
}

/**
 * Displays a preview pane for a file or folder based on the `id` query parameter in the URL.
 *
 * Fetches and displays file metadata and, if the file is a folder, its contents. Handles loading and error states, and allows closing the preview by updating the URL.
 */
export function FilePreview() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const fetchFile = createRequest({
		path: "/files/:id",
		pathParams: { id },
	});

	const { data, refetch, isLoading, error } = useRequest<FileItem>({
		request: fetchFile,
		triggers: [id],
		manual: true,
	});

	const fetchFolderContents = createRequest({
		path: "/files/:id/contents",
		pathParams: { id },
	});

	const {
		data: folderContents,
		isLoading: folderContentsLoading,
		refetch: refetchFolderContents,
	} = useRequest<FolderContentItem[]>({
		request: fetchFolderContents,
		triggers: [id],
		manual: true,
	});

	useEffect(() => {
		if (id && id !== data?.id) {
			void refetch();
		}
		// Adding refetch breaks it
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, data?.id]);

	useEffect(() => {
		if (data?.type === "folder") {
			void refetchFolderContents();
		}
		// Adding refetchFolderContents breaks it
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.type]);

	const handleClose = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("id");
		router.replace(`?${params.toString()}`);
	};

	return (
		<Sheet open={!!id} onOpenChange={handleClose}>
			<SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]" closeButton={false}>
				<SheetHeader className="mb-4">
					<div className="flex items-center justify-between">
						<SheetTitle>{!isLoading && data ? data.name : "Loading..."}</SheetTitle>
						<SheetClose asChild>
							<Button variant="ghost" size="icon">
								<X className="h-4 w-4" />
							</Button>
						</SheetClose>
					</div>
					<SheetDescription>
						{!isLoading && data
							? data.type === "document"
								? "Document Preview"
								: "Folder Contents"
							: "Loading file information..."}
					</SheetDescription>
				</SheetHeader>

				<div className="space-y-4">
					{isLoading ? (
						<Loader />
					) : error ? (
						<div className="flex flex-1 flex-col items-center justify-center space-y-2">
							<p>{parseError(error)}</p>
							<Button onClick={refetch}>Try again</Button>
						</div>
					) : data?.type === "document" ? (
						<div className="bg-muted/30 rounded-md border p-4">
							<div className="bg-background mb-4 flex aspect-[3/4] items-center justify-center rounded-md border">
								{getFileIcon(data.name, "h-16 w-16 text-primary")}
							</div>
							<div className="space-y-2">
								<h3 className="font-medium">{data?.name}</h3>
								<p className="text-muted-foreground text-sm">Size: {data?.size}</p>
								<p className="text-muted-foreground text-sm">Last modified: {data?.modified}</p>
							</div>
							<div className="mt-6 border-t pt-6">
								<h4 className="mb-2 font-medium">Document Content Preview</h4>
								<div className="space-y-2">
									<div className="bg-muted h-4 w-full rounded"></div>
									<div className="bg-muted h-4 w-5/6 rounded"></div>
									<div className="bg-muted h-4 w-4/6 rounded"></div>
									<div className="bg-muted h-4 w-full rounded"></div>
									<div className="bg-muted h-4 w-3/4 rounded"></div>
								</div>
							</div>
						</div>
					) : data?.type === "folder" ? (
						<div className="bg-muted/30 rounded-md border p-4">
							<div className="bg-background mb-4 flex aspect-[4/3] items-center justify-center rounded-md border">
								{getFileIcon(data.name, "h-16 w-16 text-primary")}
							</div>
							<div className="space-y-2">
								<h3 className="font-medium">{data?.name}</h3>
								<p className="text-muted-foreground text-sm">Last modified: {data?.modified}</p>
								{data?.size && <p className="text-muted-foreground text-sm">Total size: {data?.size}</p>}
							</div>
							<div className="mt-6 border-t pt-6">
								<h4 className="mb-2 font-medium">Folder Contents</h4>
								{folderContentsLoading ? (
									<div className="flex justify-center p-4">
										<Loader />
									</div>
								) : folderContents && folderContents.length > 0 ? (
									<div className="max-h-60 space-y-1 overflow-y-auto pr-2">
										{folderContents.map(item => (
											<div key={item.id} className="hover:bg-muted flex items-center space-x-2 rounded p-2">
												{getFileIcon(item.name, "text-muted-foreground h-4 w-4")}
												<span className="truncate text-sm">{item.name}</span>
											</div>
										))}
									</div>
								) : (
									<p className="text-muted-foreground p-2 text-sm">This folder is empty</p>
								)}
							</div>
						</div>
					) : (
						<div className="text-muted-foreground py-8 text-center">
							<Folder className="mx-auto mb-2 h-12 w-12" />
							<p>Preview not available</p>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
