const Tag = (props) => {
  const tag = props.tag;

  return (
    <li className={"tag"}>
      <span>{tag.name}</span>
    </li>
  )
}
export default Tag;