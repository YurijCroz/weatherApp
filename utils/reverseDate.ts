const reverseDate = (date: string) => {
  const reverseArrayDate = date.split("-").reverse();

  return reverseArrayDate.join("-");
};

export default reverseDate;
