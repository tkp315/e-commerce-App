function SubCategoryCard({
  size,
  name,
  description,
  thumbnail,
  price,
  cardHeight,
  imageHeight,
}) {
  return (
    <div>
      <div
        className={`card bg-[#a2ffc3] w-${size} shadow-xl h-[${cardHeight}] ml-2  flex flex-col gap-2 cursor-pointer hover:transition-all ease-in-out duration-1000`}
      >
        <div className="p-3">
          <img
            src={thumbnail}
            alt="Shoes"
            className={`bg-[#b3e140] w-full h-${imageHeight}`}
          />
        </div>
        <div className="text-center font-semibold font-sans">{name}</div>
        <div className="text-center overflow-hidden whitespace-nowrap overflow-ellipsis">
          {description}
        </div>
        <div className="text-center font-semibold">From {price}</div>
      </div>
    </div>
  );
}
export default SubCategoryCard;
