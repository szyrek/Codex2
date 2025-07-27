import { useState, useEffect } from 'preact/hooks';
import { marked } from 'marked';

interface Manifest { files: string[] }

export default function DocsView() {
  const [files, setFiles] = useState<string[]>([]);
  const [major, setMajor] = useState<string>('');
  const [majors, setMajors] = useState<number[]>([]);
  const [content, setContent] = useState<string>('');

  const base = import.meta.env.BASE_URL;

  useEffect(() => {
    fetch(`${base}docs/version.json`)
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
    fetch(`${base}docs/${m}/manifest.json`)
      .then(r => r.json())
      .then((man: Manifest) => {
        setFiles(man.files);
        loadFile(m, 'README.md');
      })
      .catch(() => {});
  };

  const loadFile = (maj: string, file: string) => {
    fetch(`${base}docs/${maj}/${file}`)
      .then(r => r.text())
      .then(t => setContent(marked.parse(t)))
      .catch(() => setContent('Documentation not found'));
  };

  const load = (file: string) => loadFile(major, file);

  return (
    <div className="docs-container" style={{position:'absolute', inset:0, display:'flex'}}>
      <div className="panel" style={{width:'220px', padding:'1rem', boxSizing:'border-box', overflowY:'auto', marginTop:'60px'}}>
        <div style={{marginBottom:'1rem'}}>
          <label>
            Version:
            <select value={major} onChange={e => changeMajor((e.target as HTMLSelectElement).value)}>
              {majors.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </label>
        </div>
        <ul style={{listStyle:'none', padding:0}}>
          {files.map(f => (
            <li key={f}><button onClick={() => load(f)} style={{width:'100%', textAlign:'left'}}>{f}</button></li>
          ))}
        </ul>
      </div>
      <div className="docs-content" style={{flex:1, padding:'1rem', overflowY:'auto', marginTop:'60px'}}>
        <div dangerouslySetInnerHTML={{__html: content}} />
      </div>
    </div>
  );
}
