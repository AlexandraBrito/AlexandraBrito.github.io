'use client';

import { useState } from 'react';
import Link from 'next/link';

// Very subtle background colors for each topic
const topicColors = {
  sewing: 'bg-pink-50/30',
  code: 'bg-amber-50/30',
  gardening: 'bg-green-50/30',
  cooking: 'bg-orange-50/30',
  diy: 'bg-stone-50/30',
  life: 'bg-purple-50/30'
};

const getTopicColor = (topicName) => {
  return topicColors[topicName.toLowerCase()] || 'bg-gray-50/30';
};

function TypeSection({ typeName, posts }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="pl-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-1 py-1 group text-left"
      >
        <span className={`text-[var(--text-secondary)] text-xs transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
          ▶
        </span>
        <span className="font-serif text-sm text-[var(--text-primary)] group-hover:text-[var(--sunny-yellow)] transition capitalize">
          {typeName} ({posts.length})
        </span>
      </button>

      {isExpanded && (
        <ul className="pl-4 space-y-1 mt-1">
          {posts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="font-serif text-sm text-[var(--text-primary)] hover:text-[var(--sky-blue)] transition block py-1"
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

  return (
    <div className="py-1">
      {/* Topic Header - Clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-1 group text-left"
      >
        <span className={`text-[var(--text-primary)] transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
          ▶
        </span>
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] capitalize group-hover:text-[var(--sunny-yellow)] transition">
          {topic.name} ({topic.totalPosts})
        </h3>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-1 space-y-1">
          {/* Types with Posts - Each expandable */}
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
    <aside>
      {/* Single container for all topics */}
      <div className="bg-white border border-[var(--warm-brown)]/20 p-4">
        <div className="space-y-2">
          {topics.map(topic => (
            <TopicWidget key={topic.name} topic={topic} />
          ))}
        </div>
      </div>
    </aside>
  );
}
