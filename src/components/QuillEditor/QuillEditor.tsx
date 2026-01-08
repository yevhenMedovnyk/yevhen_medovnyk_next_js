'use client';

import { memo, useEffect, useRef, useState, useCallback } from 'react';
import 'quill/dist/quill.snow.css';
import s from './QuillEditor.module.scss';

interface QuillEditorProps {
	value: string;
	onChange: (content: string) => void;
}

const QuillEditor = memo(({ value, onChange }: QuillEditorProps) => {
	const editorRef = useRef<HTMLDivElement>(null);
	const quillRef = useRef<any>(null);
	const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const applyMulishFont = useCallback(() => {
		if (!quillRef.current) return;
		const length = quillRef.current.getLength();
		quillRef.current.formatText(0, length, 'font', 'mulish', 'silent');
	}, []);

	useEffect(() => {
		if (!isMounted || !editorRef.current || quillRef.current) return;

		(async () => {
			const Quill = (await import('quill')).default;

			const SizeStyle = Quill.import('attributors/style/size') as any;
			SizeStyle.whitelist = [
				'0.75rem',
				'0.8rem',
				'0.875rem',
				'1rem',
				'1.25rem',
				'1.5rem',
				'2rem',
				'3rem',
			];
			Quill.register(SizeStyle, true);

			const Font = Quill.import('formats/font') as any;
			Font.whitelist = ['sans-serif', 'mulish'];
			Quill.register(Font, true);

			quillRef.current = new Quill(editorRef.current!, {
				theme: 'snow',
				placeholder: 'Почни писати...',
				modules: {
					toolbar: {
						container: [
							[{ font: ['mulish', 'sans-serif'] }],
							[{ size: SizeStyle.whitelist }],
							['bold', 'italic', 'underline', 'strike'],
							[{ header: [1, 2, 3, 4, false] }],
							[{ align: [] }],
							['link', 'clean'],
							[
								{
									color: [
										'#4a565f',
										'#252525',
										'#63707a',
										'#192c27',
										'#fdfdfd',
										'#ffffff',
										'rgba(222, 222, 222, 0.4)',
										'#c4cad0',
										'#4a4343',
										'rgb(237, 53, 53)',
										'rgb(28, 154, 227)',
									],
								},
								{ background: [] },
							],
							[{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
						],
					},
				},
			});

			quillRef.current.clipboard.dangerouslyPasteHTML(value || '', 'silent');
			applyMulishFont();

			quillRef.current.on('text-change', (delta: any, oldDelta: any, source: string) => {
				if (source !== 'user') return;

				delta.ops?.forEach((op: any) => {
					if (op.insert) {
						const selection = quillRef.current.getSelection();
						const index = selection?.index ?? 0;
						const length = typeof op.insert === 'string' ? op.insert.length : 1;
						quillRef.current.formatText(index - length, length, 'font', 'mulish', 'silent');
					}
				});

				if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
				debounceTimeout.current = setTimeout(() => {
					onChange(quillRef.current.root.innerHTML);
				}, 400);
			});
		})();
	}, [isMounted, value, onChange, applyMulishFont]);

	useEffect(() => {
		if (!quillRef.current) return;
		if (value !== quillRef.current.root.innerHTML) {
			const selection = quillRef.current.getSelection();
			quillRef.current.clipboard.dangerouslyPasteHTML(value || '');
			if (selection) {
				quillRef.current.setSelection(selection);
			}
			applyMulishFont();
		}
	}, [value, applyMulishFont]);

	if (!isMounted) return null;

	return (
		<div className={s.editorContainer}>
			<div ref={editorRef} className={s.editor} />
		</div>
	);
});

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
