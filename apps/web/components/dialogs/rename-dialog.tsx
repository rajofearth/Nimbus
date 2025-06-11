import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface RenameDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onRename: (newName: string) => void;
	itemName: string;
	itemType: "file" | "folder";
}

/**
 * Displays a modal dialog for renaming a file or folder.
 *
 * Presents a form allowing the user to enter a new name for the specified item. On submission, validates the input, invokes the rename callback with the trimmed new name, closes the dialog, and shows a success notification.
 *
 * @param itemName - The current name of the item to be renamed.
 * @param itemType - The type of item being renamed, either "file" or "folder".
 */
export function RenameDialog({ open, onOpenChange, onRename, itemName, itemType }: RenameDialogProps) {
	const [newName, setNewName] = useState(itemName);

	const handleRename = (event: FormEvent) => {
		event.preventDefault();
		if (!newName.trim()) return;

		onRename(newName.trim());
		onOpenChange(false);
		toast.success(`${itemType === "folder" ? "Folder" : "File"} renamed successfully`);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="rounded-2xl shadow-xl sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold">
						Rename {itemType === "folder" ? "Folder" : "File"}
					</DialogTitle>
					<DialogDescription className="text-muted-foreground text-sm">
						Enter a new name for this {itemType}.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleRename} className="space-y-6">
					<div className="grid gap-2">
						<Label htmlFor="new-name" className="text-sm font-medium">
							New Name
						</Label>
						<Input
							id="new-name"
							placeholder={`Enter new ${itemType} name`}
							value={newName}
							onChange={e => setNewName(e.target.value)}
							required
							className="focus-visible:ring-ring focus-visible:ring-2"
							maxLength={255}
						/>
					</div>

					<DialogFooter className="flex justify-between">
						<Button
							type="button"
							variant="ghost"
							onClick={() => onOpenChange(false)}
							className="text-muted-foreground hover:text-foreground cursor-pointer"
						>
							Cancel
						</Button>
						<Button type="submit" disabled={!newName.trim()} className="cursor-pointer">
							Rename
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
