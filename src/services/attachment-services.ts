import { Attachment } from '@/libs/types';
import { deleteOne, getAll, post } from './api-client';

const endpoint = '/attachments';

export const getAttachments = () => getAll<Attachment>(endpoint);

export const createAttachment = (data: Attachment) =>
	post<Attachment>(endpoint, data);

export const deleteAttachment = (id: string) =>
	deleteOne<Attachment>(endpoint, id);
