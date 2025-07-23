import { useState, useEffect } from 'preact/hooks';
import { marked } from 'marked';

interface Manifest { files: string[] }

export default function DocsView() {
  const [files, setFiles] = useState<string[]>([]);
  const [major, setMajor] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch('/docs/version.json')
      .then(r => r.json())
      .then(v => {
        setMajor(String(v.major));
        return fetch(`/docs/${v.major}/manifest.json`);
      })
      .then(r => r.json())
      .then((m: Manifest) => setFiles(m.files))
      .catch(() => {});
  }, []);

  const load = (file: string) => {
    fetch(`/docs/${major}/${file}`)
      .then(r => r.text())
      .then(t => setContent(marked.parse(t)));
  };

  return (
    <div style={{color:'#fff', padding:'1rem', overflow:'auto', height:'100%'}}>
      <ul>
        {files.map(f => (
          <li key={f}><button onClick={() => load(f)}>{f}</button></li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{__html: content}} />
    </div>
  );
}
