/** Link para fora do site: abre em nova aba e avisa isso a leitores de tela. */
export function ExternalLink({ href, className, children, hint = "abre em nova aba" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="visually-hidden"> ({hint})</span>
    </a>
  );
}
