export default function Columns_2_1({ children }) {
  const style = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
        'grid1'
        'grid2'
        'grid3'
        `,
  };
  return <div style={style}>{children}</div>;
}
