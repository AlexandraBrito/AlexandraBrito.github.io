export default function About() {
  return (
    <div className="min-h-screen bg-[var(--warm-white)]">
      {/* Content */}
      <main className="max-w-3xl mx-auto bg-white p-8 md:p-12 my-12 rounded-xl relative" style={{ border: '2px solid var(--navy-blue)' }}>
        {/* Topic tag sticker */}
        <div
          className="absolute -top-6 left-7 font-sans text-lg uppercase tracking-widest font-black px-6 py-3 shadow-lg z-10"
          style={{
            backgroundColor: '#A2A655',
            color: 'white',
            border: '2px solid var(--navy-blue)',
            transform: 'rotate(-3deg)'
          }}
        >
          About Me
        </div>

        {/* Corner image 1 - bottom right */}
        <div
          className="absolute transition-transform overflow-hidden rounded"
          style={{
            width: '300px',
            height: '300px',
            bottom: '-90px',
            right: '-90px',
            transform: 'rotate(5deg)',
            transformOrigin: 'center',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            border: '2px solid var(--navy-blue)'
          }}
        >
          <img
            src="/images/about-corner.jpg"
            alt="About corner decoration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Corner image 2 - top left outside */}
        <div
          className="absolute transition-transform overflow-hidden rounded"
          style={{
            width: '200px',
            height: '200px',
            top: '100px',
            left: '-180px',
            transform: 'rotate(-5deg)',
            transformOrigin: 'center',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            border: '2px solid var(--navy-blue)'
          }}
        >
          <img
            src="/images/about-photo.jpg"
            alt="About photo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Corner image 3 - top right outside */}
        <div
          className="absolute transition-transform overflow-hidden rounded"
          style={{
            width: '220px',
            height: '220px',
            top: '50px',
            right: '-110px',
            transform: 'rotate(8deg)',
            transformOrigin: 'center',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            border: '2px solid var(--navy-blue)'
          }}
        >
          <img
            src="/images/about-photo-3.jpg"
            alt="About photo 3"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none pr-40 pb-32
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
