import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onDelete: () => void;
	itemName: string;
	itemType: "file" | "folder";
}

/**
 * Displays a confirmation dialog for deleting a file or folder.
 *
 * Renders a modal dialog prompting the user to confirm deletion of the specified item. Upon confirmation, invokes the deletion handler, shows a success notification, and closes the dialog.
 *
 * @param itemName - The name of the file or folder to be deleted.
 * @param itemType - The type of item to delete, either "file" or "folder".
 */
export function DeleteDialog({ open, onOpenChange, onDelete, itemName, itemType }: DeleteDialogProps) {
	const handleDelete = () => {
		onDelete();
		toast.success(`${itemType === "folder" ? "Folder" : "File"} deleted successfully`);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="rounded-2xl shadow-xl sm:max-w-md">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="rounded-full bg-red-100 p-2 dark:bg-red-900/20">
							<Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
						</div>
						<div>
							<DialogTitle className="text-xl font-semibold">
								Delete {itemType === "folder" ? "Folder" : "File"}
							</DialogTitle>
							<DialogDescription className="text-muted-foreground text-sm">
								Are you sure you want to delete &quot;{itemName}&quot;?
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<div className="text-muted-foreground mt-4 text-sm">
					This action cannot be undone. This will permanently delete this {itemType}
					and remove all associated data.
				</div>

				<DialogFooter className="mt-6 flex justify-between">
					<Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
						Cancel
					</Button>
					<Button type="button" variant="destructive" onClick={handleDelete} className="cursor-pointer">
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
