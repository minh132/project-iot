import { thunkDeletegarden, thunkGetgardensList } from "app/gardenSlice";
import BaseLayout from "general/components/BaseLayout";
import BootstrapTable from "react-bootstrap/Table";
import BaseSearchBar from "general/components/Form/BaseSearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import ToastHelper from "general/helpers/ToastHelper";
import DialogModal from "general/components/DialogModal";
import ModalEditgarden from "./ModalEditgarden";

gardensListScreen.propTypes = {};

function gardensListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { gardensList, isDeletinggarden } = useSelector((state) => state?.garden);
    const [selectedgarden, setSelectedgarden] = useState({});
    const [showModalEditgarden, setShowModalEditgarden] = useState(false);
    const [showModalDeletegarden, setShowModalDeletegarden] = useState(false);

    const [filters, setFilters] = useState({
        q: "",
    });

    useEffect(() => {
        document.title = "Danh sách nhà | Sgarden"
     }, []);

    const handleDeletegarden = async () => {
        const res = await dispatch(
            thunkDeletegarden({
                gardenId: selectedgarden._id,
            })
        );
        console.log(res);
        if (res.payload.result === "success") {
            ToastHelper.showSuccess(`Xóa [${selectedgarden?.name}] thành công`);
            await dispatch(thunkGetgardensList(filters));
        }
    };

    useEffect(() => {
        dispatch(thunkGetgardensList(filters));
    }, [filters]);
    return (
        <div>
            <BaseLayout selected="gardens">
                <div className="gardensListScreen flex-column-fluid">
                    <div className="container-xxl">
                        <div className="card card-flush mb-9">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    <div className="font-weight-bolder font-size-h3 text-remaining">
                                        Danh sách nhà
                                    </div>
                                    <div>
                                        <BaseSearchBar
                                            placeholder="Tìm kiếm nhà"
                                            className=""
                                            value={filters.q}
                                            name="gardenFilter"
                                            onSubmit={(value) => {
                                                setFilters({
                                                    ...filters,
                                                    q: value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                {gardensList?.length > 0 ? (
                                    <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                        Tổng cộng: {gardensList?.length} nhà
                                    </div>
                                ) : (
                                    <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                        Danh sách trống
                                    </div>
                                )}
                            </div>
                            <div className="card-body p-0">
                                {gardensList?.length > 0 && (
                                    <BootstrapTable striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên nhà</th>
                                                <th>Địa chỉ</th>
                                                <th>Số phòng</th>
                                                <th>Thực hiện</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gardensList?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.address}</td>
                                                    <td>
                                                        {item.roomsList?.length}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <a
                                                                className="btn btn-icon btn-sm btn-light-primary btn-hover-primary mr-2"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    setSelectedgarden(
                                                                        item
                                                                    );
                                                                    setShowModalEditgarden(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <i className="far fa-pen p-0 icon-1x" />
                                                            </a>
                                                            <a
                                                                className="btn btn-icon btn-sm btn-light-danger btn-hover-danger"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    setSelectedgarden(
                                                                        item
                                                                    );
                                                                    setShowModalDeletegarden(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <i className="far fa-trash p-0 icon-1x" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </BootstrapTable>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ModalEditgarden
                    show={showModalEditgarden}
                    onClose={() => setShowModalEditgarden(false)}
                    gardenItem={selectedgarden}
                />
                <DialogModal
                    title="Xóa nhà"
                    description={`Bạn có chắc muốn xóa nhà [${selectedgarden?.name}]`}
                    show={showModalDeletegarden}
                    close={!isDeletinggarden}
                    onClose={() => setShowModalDeletegarden(false)}
                    onExecute={handleDeletegarden}
                />
            </BaseLayout>
        </div>
    );
}

export default gardensListScreen;
