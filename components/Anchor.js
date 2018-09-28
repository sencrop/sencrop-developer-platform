const Anchor = ({ text, id }) => {
  const hash = id || text.toLowerCase().replace(/[^\d\w]/g, "_");

  return (
    <span>
      <small aria-hidden="true"><a id={hash} href={`#${hash}`}>
        🔗
      </a></small>{" "}
      {text}
    </span>
  );
};

export default Anchor;
