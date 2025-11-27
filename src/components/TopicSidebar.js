'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getTopicColor } from '@/lib/topicColors';

function TypeSection({ typeName, posts }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="my-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 py-1 group text-left transition-all"
      >
        <span className={`text-[var(--text-secondary)] text-[10px] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
          ▶
        </span>
        <span className="font-sans text-xs uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[#A2A655] transition-colors">
          {typeName} ({posts.length})
        </span>
      </button>

      {isExpanded && (
        <ul className="pl-5 space-y-0.5 mt-1">
          {posts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="font-serif text-sm text-[var(--navy-blue)] hover:text-[#A2A655] transition-colors block py-0.5"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TopicWidget({ topic }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeEntries = Object.entries(topic.types);
  const colors = getTopicColor(topic.name);

  return (
    <div className="mb-4 bg-white relative rounded-lg" style={{ border: '2px solid var(--navy-blue)' }}>
      {/* Topic Header Button - simple sticker style */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 py-2.5 px-4 text-left group transition-all hover:brightness-105"
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          borderBottom: isExpanded ? '2px solid var(--navy-blue)' : 'none'
        }}
      >
        <span className={`transition-transform duration-200 text-sm ${isExpanded ? 'rotate-90' : ''}`}>
          ▶
        </span>
        <h3 className="font-sans text-sm font-bold uppercase tracking-widest">
          {topic.name} ({topic.totalPosts})
        </h3>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 py-3">
          {typeEntries.map(([typeName, posts]) => (
            <TypeSection
              key={typeName}
              typeName={typeName}
              posts={posts}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TopicSidebar({ topics, archives }) {
  return (
    <aside className="space-y-0">
      {topics.map(topic => (
        <TopicWidget key={topic.name} topic={topic} />
      ))}
    </aside>
  );
}
