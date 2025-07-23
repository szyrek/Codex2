import { useState, useEffect } from 'preact/hooks';
import { marked } from 'marked';

interface Manifest { files: string[] }

export default function DocsView() {
  const [files, setFiles] = useState<string[]>([]);
  const [major, setMajor] = useState<string>('');
  const [majors, setMajors] = useState<number[]>([]);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch('/docs/version.json')
      .then(r => r.json())
      .then(v => {
        const max = Number(v.major);
        setMajors(Array.from({ length: max }, (_, i) => i + 1));
        changeMajor(String(v.major));
      })
      .catch(() => {});
  }, []);

  const changeMajor = (m: string) => {
    setMajor(m);
    fetch(`/docs/${m}/manifest.json`)
      .then(r => r.json())
      .then((man: Manifest) => {
        setFiles(man.files);
        loadFile(m, 'README.md');
      })
      .catch(() => {});
  };

  const loadFile = (maj: string, file: string) => {
    fetch(`/docs/${maj}/${file}`)
      .then(r => r.text())
      .then(t => setContent(marked.parse(t)));
  };

  const load = (file: string) => loadFile(major, file);

  return (
    <div style={{color:'#fff', padding:'1rem', overflow:'auto', height:'100%'}}>
      <div style={{marginBottom:'1rem'}}>
        <label>
          Version:
          <select value={major} onChange={e => changeMajor((e.target as HTMLSelectElement).value)}>
            {majors.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
      </div>
      <ul>
        {files.map(f => (
          <li key={f}><button onClick={() => load(f)}>{f}</button></li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{__html: content}} />
    </div>
  );
}
