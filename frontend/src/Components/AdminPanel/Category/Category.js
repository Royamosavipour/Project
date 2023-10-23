import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";

export default function Category() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        console.log(allCategories);
      });
  }, []);

  return (
    <>
      <DataTable title={"دسته بندی"}></DataTable>
    </>
  );
}
