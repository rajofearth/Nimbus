import { useState } from "react";
import { toast } from "sonner";

export type FileType = "file" | "folder";

export interface FileActionItem {
	id: string;
	name: string;
	type: FileType;
}

/**
 * Provides state and handlers for managing file and folder actions, including rename, delete, and move, along with their associated dialog states.
 *
 * @returns An object containing dialog open states and setters, the currently selected item, action trigger functions to open dialogs, and action execution functions for renaming, deleting, and moving items.
 *
 * @remark This hook does not perform actual API calls for file operations; it only manages UI state and displays success notifications.
 */
export function useFileActions() {
	// Dialog states
	const [renameDialogOpen, setRenameDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [moveDialogOpen, setMoveDialogOpen] = useState(false);

	// Selected item for action
	const [selectedItem, setSelectedItem] = useState<FileActionItem | null>(null);

	// Action handlers
	const handleRenameAction = (id: string, name: string, type: FileType) => {
		setSelectedItem({ id, name, type });
		setRenameDialogOpen(true);
	};

	const handleDeleteAction = (id: string, name: string, type: FileType) => {
		setSelectedItem({ id, name, type });
		setDeleteDialogOpen(true);
	};

	const handleMoveAction = (id: string, name: string, type: FileType) => {
		setSelectedItem({ id, name, type });
		setMoveDialogOpen(true);
	};

	// Perform actions
	const renameItem = (newName: string) => {
		if (!selectedItem) return;
		console.log(`Rename ${selectedItem.type} ${selectedItem.id} to ${newName}`);
		// Here you would call your actual rename API
		toast.success(`${selectedItem.type === "folder" ? "Folder" : "File"} renamed to "${newName}"`);
		setRenameDialogOpen(false);
		setSelectedItem(null);
	};

	const deleteItem = () => {
		if (!selectedItem) return;
		console.log(`Delete ${selectedItem.type} ${selectedItem.id}`);
		// Here you would call your actual delete API
		toast.success(`${selectedItem.type === "folder" ? "Folder" : "File"} "${selectedItem.name}" deleted`);
	};

	const moveItem = (destinationId: string) => {
		if (!selectedItem) return;
		console.log(`Move ${selectedItem.type} ${selectedItem.id} to destination ${destinationId}`);
		// Here you would call your actual move API
		toast.success(`${selectedItem.type === "folder" ? "Folder" : "File"} moved successfully`);
	};

	return {
		// Dialog states
		renameDialogOpen,
		deleteDialogOpen,
		moveDialogOpen,

		// Dialog state setters
		setRenameDialogOpen,
		setDeleteDialogOpen,
		setMoveDialogOpen,

		// Selected item
		selectedItem,

		// Action triggers
		handleRenameAction,
		handleDeleteAction,
		handleMoveAction,

		// Action handlers
		renameItem,
		deleteItem,
		moveItem,
	};
}
