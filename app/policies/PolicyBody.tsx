import type { ReactNode } from 'react';
import type { Block, Policy } from '@/lib/policies-data';

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): ReactNode[] {
    return text
        .split(TOKEN)
        .filter(Boolean)
        .map((part, i) => {
            const bold = part.match(/^\*\*([^*]+)\*\*$/);
            if (bold) return <strong key={i}>{bold[1]}</strong>;

            const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (link) {
                const [, label, href] = link;
                const external = /^https?:\/\//.test(href);
                return (
                    <a
                        key={i}
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                        {label}
                    </a>
                );
            }
            return part;
        });
}

function renderBlock(block: Block, key: number): ReactNode {
    switch (block.type) {
        case 'p':
            return <p key={key} className="pol-p">{renderInline(block.text)}</p>;
        case 'h3':
            return <h3 key={key} className="pol-h3">{block.text}</h3>;
        case 'ul':
            return (
                <ul key={key} className="pol-ul">
                    {block.items.map((item, i) => (
                        <li key={i} className="pol-li">{renderInline(item)}</li>
                    ))}
                </ul>
            );
        case 'callout':
            return (
                <aside
                    key={key}
                    className={`pol-callout ${block.tone === 'green' ? 'pol-callout--green' : 'pol-callout--grey'}`}
                >
                    <h4 className="pol-callout-title">{block.title}</h4>
                    {block.text && <p className="pol-callout-text">{renderInline(block.text)}</p>}
                    {block.items && (
                        <ul className="pol-callout-list">
                            {block.items.map((item, i) => (
                                <li key={i}>{renderInline(item)}</li>
                            ))}
                        </ul>
                    )}
                </aside>
            );
    }
}

export default function PolicyBody({ policy }: { policy: Policy }) {
    return (
        <article className="pol-article">
            <div className="pol-intro">
                {policy.intro.map((text, i) => (
                    <p key={i} className="pol-p">{renderInline(text)}</p>
                ))}
            </div>

            {policy.sections.map((section) => (
                <section key={section.id} id={section.id} className="pol-section">
                    <h2 className="pol-h2">{section.heading}</h2>
                    {section.blocks.map(renderBlock)}
                </section>
            ))}
        </article>
    );
}
