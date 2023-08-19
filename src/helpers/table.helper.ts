export const getNo = ({
  pageNumber = 1,
  pageSize = 0,
  index = 1,
}: {
  pageNumber: number;
  pageSize: number;
  index: number;
}): number => {
  return (pageNumber - 1) * pageSize + (index + 1);
};
