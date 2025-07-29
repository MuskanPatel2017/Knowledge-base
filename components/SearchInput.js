//Reusable, accessible search input with ARIA attributes

export default function SearchInput({ value, onChange }) {
  return (
    <label htmlFor="search" style={{ display: 'block', marginBottom: '1rem' }}>
      <span className="visually-hidden">Search articles</span>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search articles..."
        style={{ padding: '0.5rem', width: '100%', maxWidth: '400px' }}
        aria-label="Search articles"
      />
    </label>
  );
}
