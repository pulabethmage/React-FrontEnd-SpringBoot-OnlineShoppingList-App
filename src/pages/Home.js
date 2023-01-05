import axios from "axios";
import React, { useEffect, useState } from "react";
import FloatingButton from "../components/FloatingButton";
import { Link, useParams, useNavigate } from "react-router-dom";

function Home() {
  ///For Update Purchased
  const initialValuesPurchased = {
    purchased: 0,
  };
  const [chartPurchased, setchartPurchased] = useState(initialValuesPurchased);
  //End

  //popup variables
  let navigate = useNavigate();

  const initialValues = {
    item: "",
    itemqty: "",
    itemdesc: "",
    purchased: 0,
  };

  const [chartPop, setChartPop] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setChartPop({
      ...chartPop,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/chart/add", chartPop);
    loadChartItems();
  };
  //End

  // Home variables
  const [chart, setChart] = useState([]);

  useEffect(() => {
    loadChartItems();
  }, []);
  //end

  const loadChartItems = async () => {
    const result = await axios.get("http://localhost:8080/chart/all");
    setChart(result.data);
  };

  const deleteChartItem = async (id) => {
    await axios.delete(`http://localhost:8080/chart/items/${id}`);
    loadChartItems();
  };

  const updateChartItem = async (id, purcd) => {
    if (purcd == 0) {
      initialValuesPurchased.purchased = 1;
    } else {
      initialValuesPurchased.purchased = 0;
    }

    await axios.put(
      `http://localhost:8080/chart/items/${id}`,
      initialValuesPurchased
    );
    loadChartItems();
  };

  return (
    <div>
      <FloatingButton />

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
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
                  <label >Item Name</label>
                  <input
                    type={"text"}
                    className="form-control mt-1"
                    placeholder="Enter Item Name"
                    value={chartPop.item}
                    onChange={handleInputChange}
                    name="item"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label >Item Qty</label>
                  <input
                    type={"text"}
                    className="form-control mt-1"
                    placeholder="Enter Item Qty"
                    value={chartPop.itemqty}
                    onChange={handleInputChange}
                    name="itemqty"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label >Special Note</label>
                  <textarea
                    type={"text"}
                    className="form-control mt-1"
                    placeholder="Enter Note"
                    rows="3"
                    value={chartPop.itemdesc}
                    onChange={handleInputChange}
                    name="itemdesc"
                  ></textarea>
                </div>
                <div className="form-group mt-2">
                  {/* <label for="">Purchased</label> */}
                  <input
                    readOnly
                    hidden
                    type={"text"}
                    className="form-control mt-1"
                    placeholder="Enter Item Qty"
                    value={chartPop.purchased}
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
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Home View Cards */}

      <div className="container">
        <div className="row text-center g-2 align-items-center justify-content-between mt-1 mb-3">
          {chart.map((chart, index) => (
            <div className="col-sm" key={index}>
              <div className="card">
                <div
                  className={
                    chart.purchased == 1
                      ? "card-body bg-cuscolor3"
                      : "card-body"
                  }
                >
                  <h5 className="card-title text-uppercase">{chart.item}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {chart.itemqty}
                  </h6>
                  <p className="card-text">{chart.itemdesc}</p>

                  <Link
                    onClick={() => deleteChartItem(chart.id)}
                    className="btn btn-cuscolordelete btn-lg text-light justify-content-center"
                  >
                    <i className="bi bi-trash"></i>
                  </Link>

                  <Link
                    onClick={() => updateChartItem(chart.id, chart.purchased)}
                    className="btn btn-cuscolor1darker btn-lg text-light ms-1"
                  >
                    <i className="bi bi-bag-check"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
