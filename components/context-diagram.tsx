const workflows = [
  { title: 'Natural-language analysis', input: 'Work with your data', detail: 'Ask questions about your data in plain language and use the results to make informed decisions.' },
  { title: 'Agent-ready codebases', input: 'Work with your repository', detail: 'Help coding agents follow the architecture decisions, specifications, and shared instructions in your repository.' },
  { title: 'On-call AI agents', input: 'Work with your operations', detail: 'Agents that assist on-call teams with incident investigation, using information from their systems.' },
];

export function ContextDiagram() {
  return <figure className="diagram" aria-label="Transition: tools for agent-native work, with optional shared company context">
    <div className="diagram-heading"><span className="eyebrow">Transition / Planned tools</span><span className="diagram-key"><i /> Planned capabilities</span></div>
    <div className="platform-map">
      <p className="eyebrow">Three areas we are working toward</p>
      <div className="platform-tools">{workflows.map(tool => <div className="platform-tool" key={tool.title}><span className="eyebrow">{tool.input}</span><h3>{tool.title}</h3><p>{tool.detail}</p></div>)}</div>
      <div className="platform-context"><div><span className="eyebrow">When broader context is useful</span><h3>Shared company context</h3></div><p>Some tasks need information from conversations, documents, and project records across the company. We plan to support that through shared context. Other tasks, such as working with architecture decision records in a repository, can use the relevant sources directly.</p></div>
      <p className="eyebrow">Open source · Your infrastructure · Your choice of models</p>
    </div>
    <figcaption>These tools are not yet available. When using external models, teams will need to decide which data may leave their infrastructure.</figcaption>
  </figure>;
}
