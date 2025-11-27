export default function About() {
  return (
    <div className="min-h-screen bg-[var(--warm-white)]">
      {/* Page Header */}
      <section className="bg-[var(--cream)] border-b border-[var(--warm-brown)]/20">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[var(--soft-brown)] mb-4">
            About Me
          </h1>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-3xl mx-auto bg-white p-8 md:p-12 my-12 rounded-xl" style={{ border: '2px solid var(--navy-blue)' }}>
        <div className="prose prose-lg max-w-none
                        prose-headings:font-serif prose-headings:font-bold prose-headings:text-[var(--soft-brown)]
                        prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                        prose-p:font-serif prose-p:text-[var(--text-primary)] prose-p:leading-relaxed prose-p:text-lg
                        prose-ul:my-4 prose-li:my-3 prose-li:font-serif prose-li:text-[var(--text-primary)]
                        prose-strong:text-[var(--soft-brown)] prose-strong:font-semibold">
          <p>
            Hi! I'm Alexandra, and this is my little corner of the internet where I share my adventures in making, creating, and learning.
          </p>

          <h2>What You'll Find Here</h2>

          <ul>
            <li><strong>Sewing Projects:</strong> From beginner patterns to ambitious makes</li>
            <li><strong>Code Adventures:</strong> Web development, automation, and tech experiments</li>
            <li><strong>Garden Updates:</strong> Growing food and flowers in small spaces</li>
            <li><strong>Cooking & Baking:</strong> Recipes, experiments, and delicious failures</li>
            <li><strong>DIY & Crafts:</strong> Making things with my hands</li>
          </ul>

          <p>
            Thanks for stopping by! Feel free to reach out if you want to chat about any of these topics.
          </p>
        </div>
      </main>
    </div>
  );
}
