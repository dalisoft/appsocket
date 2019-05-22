export default React.memo((props) => (
  <content className="app__layout_content">
    <h2>content</h2>
    {JSON.stringify(props, null, 4)}
  </content>
));
