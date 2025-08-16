'use client';

import { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import s from './QuillEditor.module.scss';

export default function QuillEditor() {
	const editorRef = useRef<HTMLDivElement>(null);
	const quillInstance = useRef<any>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (!mounted) return;
		if (editorRef.current && !quillInstance.current) {
			(async () => {
				const Quill = (await import('quill')).default;

				//Кастомні розміри шрифтів
				const SizeStyle = Quill.import('attributors/style/size') as any;
				SizeStyle.whitelist = ['0.75rem', '0.875rem', '1rem', '1.25rem', '1.5rem', '2rem', '3rem'];
				Quill.register(SizeStyle, true);

				// Додаємо свій шрифт до whitelist
				const Font = Quill.import('formats/font') as any;
				Font.whitelist = ['sans-serif', 'mulish'];
				Quill.register(Font, true);
				

				quillInstance.current = new Quill(editorRef.current!, {
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
								[{ color: [] }, { background: [] }],
								[{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
							],
							handlers: {},
						},
					},
				});
			})();
		}
	}, [mounted]);

	if (!mounted) return null;

	return (
		<div className={s.editorContainer}>
			<div ref={editorRef} className={s.editor} />
		</div>
	);
}
