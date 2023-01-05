import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function PopUpModel() {
  let navigate = useNavigate();

  const initialValues = {
    item: "",
    itemqty: "",
    itemdesc: "",
    purchased: 0,
  };

  const [chart, setChart] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setChart({
      ...chart,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/chart/add", chart);
    navigate("/");
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Item
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label for="">Item Name</label>
                  <input
                    type={"text"}
                    className="form-control mt-1"
                    placeholder="Enter Item Name"
                    value={chart.item}
                    onChange={handleInputChange}
                    name="item"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label for="">Item Qty</label>
                  <input
                    type={"text"}
                    className="form-control mt-1"
                    placeholder="Enter Item Qty"
                    value={chart.itemqty}
                    onChange={handleInputChange}
                    name="itemqty"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label for="">Special Note</label>
                  <textarea
                    type={"text"}
                    className="form-control mt-1"
                    placeholder="Enter Note"
                    rows="3"
                    value={chart.itemdesc}
                    onChange={handleInputChange}
                    name="itemdesc"
                  ></textarea>
                </div>
                <div className="form-group mt-2">
                  <label for="">Purchased</label>
                  <input
                    readOnly
                    type={"text"}
                    className="form-control mt-1"
                    placeholder="Enter Item Qty"
                    value={chart.purchased}
                    onChange={handleInputChange}
                    name="purchased"
                    required
                  />
                </div>

                <div className="modal-footer">
                  <Link
                    to={"/"}
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </Link>
                  <button
                    type={"submit"}
                    className="btn btn-cuscolor1darker"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUpModel;
