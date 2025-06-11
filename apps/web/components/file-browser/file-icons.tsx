import {
	FileText,
	FileImage,
	FileVideo,
	FileMusic,
	FileCode,
	FileArchive,
	File,
	Presentation,
	Table,
} from "lucide-react";
import React from "react";

export type FileExtension =
	| "pdf"
	| "doc"
	| "docx"
	| "xls"
	| "xlsx"
	| "ppt"
	| "pptx"
	| "txt"
	| "rtf"
	| "md"
	| "csv"
	| "json"
	| "xml"
	| "html"
	| "css"
	| "js"
	| "jsx"
	| "ts"
	| "tsx"
	| "php"
	| "py"
	| "rb"
	| "java"
	| "c"
	| "cpp"
	| "go"
	| "rs"
	| "swift"
	| "kt"
	| "dart"
	| "jpg"
	| "jpeg"
	| "png"
	| "gif"
	| "svg"
	| "webp"
	| "bmp"
	| "ico"
	| "mp4"
	| "mov"
	| "avi"
	| "mkv"
	| "webm"
	| "mp3"
	| "wav"
	| "ogg"
	| "flac"
	| "zip"
	| "rar"
	| "tar"
	| "gz"
	| "7z";

interface FileIconProps {
	extension: FileExtension | string;
	className?: string;
}

// Helper function to get icon by category
const getIconByCategory = (category: string, props: { className?: string }) => {
	switch (category) {
		case "document":
			return <FileText {...props} />;
		case "spreadsheet":
			return <Table {...props} />;
		case "presentation":
			return <Presentation {...props} />;
		case "image":
			return <FileImage {...props} />;
		case "video":
			return <FileVideo {...props} />;
		case "audio":
			return <FileMusic {...props} />;
		case "code":
			return <FileCode {...props} />;
		case "archive":
			return <FileArchive {...props} />;
		case "pdf":
			return <File {...props} color="red" />;
		default:
			return <File {...props} />;
	}
};

// Map extensions to categories
const extensionCategoryMap: Record<string, string> = {
	// Documents
	pdf: "pdf",
	doc: "document",
	docx: "document",
	txt: "document",
	rtf: "document",
	md: "document",

	// Spreadsheets
	xls: "spreadsheet",
	xlsx: "spreadsheet",
	csv: "spreadsheet",

	// Presentations
	ppt: "presentation",
	pptx: "presentation",

	// Code
	json: "code",
	xml: "code",
	html: "code",
	css: "code",
	js: "code",
	jsx: "code",
	ts: "code",
	tsx: "code",
	php: "code",
	py: "code",
	rb: "code",
	java: "code",
	c: "code",
	cpp: "code",
	go: "code",
	rs: "code",
	swift: "code",
	kt: "code",
	dart: "code",

	// Images
	jpg: "image",
	jpeg: "image",
	png: "image",
	gif: "image",
	svg: "image",
	webp: "image",
	bmp: "image",
	ico: "image",

	// Videos
	mp4: "video",
	mov: "video",
	avi: "video",
	mkv: "video",
	webm: "video",

	// Audio
	mp3: "audio",
	wav: "audio",
	ogg: "audio",
	flac: "audio",

	// Archives
	zip: "archive",
	rar: "archive",
	tar: "archive",
	gz: "archive",
	"7z": "archive",
};

/**
 * Renders an icon representing the file type based on the provided file extension.
 *
 * Displays a category-specific icon for recognized file extensions, or a generic file icon for unknown types.
 *
 * @param extension - The file extension to determine the icon.
 * @param className - Optional CSS class for styling the icon.
 * @returns A React element displaying the appropriate file type icon.
 */
export function FileIcon({ extension, className }: FileIconProps) {
	// Get the category for the extension
	const category = extensionCategoryMap[extension.toLowerCase()] || "unknown";

	// Return the appropriate icon based on the category
	return getIconByCategory(category, { className });
}

/**
 * Extracts and returns the lowercase file extension from a filename.
 *
 * @param filename - The name of the file to extract the extension from.
 * @returns The file extension in lowercase, or an empty string if none is found.
 */
export function getFileExtension(filename: string): string {
	const parts = filename.split(".");
	return parts.length > 1 ? parts.pop()?.toLowerCase() || "" : "";
}

/**
 * Returns a file type icon component corresponding to the extension of the given filename.
 *
 * @param filename - The name of the file whose icon should be rendered.
 * @param className - Optional CSS class name to apply to the icon.
 * @returns A {@link FileIcon} component representing the file type.
 */
export function getFileIcon(filename: string, className?: string) {
	const extension = getFileExtension(filename);
	return <FileIcon extension={extension} className={className} />;
}
