/**
 * Enum representing different file types.
 *
 * @enum {string}
 * @property {string} ALL - Represents all file types.
 * @property {string} PDF - Represents PDF file type.
 * @property {string} DOC - Represents DOC file type.
 * @property {string} XLS - Represents XLS file type.
 * @property {string} PPT - Represents PPT file type.
 * @property {string} TXT - Represents TXT file type.
 * @property {string} OTHER - Represents other file types.
 */
export enum FileType {
  ALL = 'All',
  PDF = 'PDF',
  DOC = 'DOC',
  XLS = 'XLS',
  PPT = 'PPT',
  TXT = 'TXT',
  OTHER = 'OTHER',
}

/**
 * Maps file type string to FileType enum.
 *
 * @param {string} fileType - File type string.
 * @returns {FileType} - File type enum.
 */
export function mapFileType(fileType: string): FileType {
  const fileTypeUpper = fileType.toUpperCase();
  return FileType[fileTypeUpper as keyof typeof FileType] || FileType.OTHER;
}

export interface ErrorResponseType {
  message: string;
  details: string;
  status: number;
}
