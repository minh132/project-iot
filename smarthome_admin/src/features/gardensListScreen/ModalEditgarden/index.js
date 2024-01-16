import { thunkGetgardensList, thunkUpdategardenData } from "app/gardenSlice";
import { useFormik } from "formik";
import BaseTextField from "general/components/Form/BaseTextField";
import ToastHelper from "general/helpers/ToastHelper";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

ModalEditgarden.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    gardenItem: PropTypes.object,
};

ModalEditgarden.defaultProps = {
    show: false,
    onClose: null,
    gardenItem: {},
};

function ModalEditgarden(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // MARK: --- Params ---
    const { show, onClose, gardenItem } = props;
    const [showing, setShowing] = useState(true);

    const { isUpdatinggardenData } = useSelector((state) => state?.garden);
    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
        },
        onSubmit: async (values) => {
            const params = { _id: gardenItem._id, ...values };
            try {
                const res = await dispatch(thunkUpdategardenData(params));
                console.log(res);
                if (res.payload.result === "success") {
                    handleClose();
                    formik.handleReset();
                    ToastHelper.showSuccess("Sửa thông tin nhà thành công");
                    await dispatch(thunkGetgardensList({q: ""}));
                }
            } catch (err) {
                console.log(`${err.message}`);
            }
        },
        validationSchema: Yup.object({
            name: Yup.string().trim().required("Bạn chưa nhập tên"),
            address: Yup.string().trim().required("Bạn chưa nhập địa chỉ"),
        }),
    });

    useEffect(() => {
        if (gardenItem) {
            formik.getFieldHelpers("name").setValue(gardenItem.name);
            formik.getFieldHelpers("address").setValue(gardenItem.address);
        }
    }, [gardenItem]);

    // MARK: --- Functions ---
    function handleClose() {
        if (onClose) {
            onClose();
        }
    }
    return (
        <div className="ModalEditgarden">
            <Modal
                className=""
                show={show && showing}
                size="lg"
                onHide={handleClose}
                centered
                onExited={() => {}}
            >
                {/* header */}
                <Modal.Header className="px-5 py-5 d-flex align-items-center justify-content-center position-relative">
                    <Modal.Title className="">Chỉnh sửa thông tin nhà</Modal.Title>
                    <div
                        className="btn btn-xs btn-icon btn-light btn-hover-secondary cursor-pointer position-absolute right-0 mr-5"
                        onClick={handleClose}
                    >
                        <i className="far fa-times"></i>
                    </div>
                </Modal.Header>
                {/* body */}
                <Modal.Body className="bg-light">
                    <form className="w-100">
                        <div>
                            <div>
                                <div className="d-flex flex-column mt-5 p-7 p-lg-10 border-1 bg-white shadow-sm rounded">
                                    <div>
                                        <BaseTextField
                                            require={true}
                                            name="name"
                                            placeholder="Nhập tên nhà..."
                                            label="Tên nhà"
                                            fieldHelper={formik.getFieldHelpers(
                                                "name"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "name"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "name"
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-column mt-5 p-7 p-lg-10 border-1 bg-white shadow-sm rounded">
                                    <div>
                                        <BaseTextField
                                            require={true}
                                            name="address"
                                            placeholder="Nhập địa chỉ nhà..."
                                            label="Địa chỉ"
                                            fieldHelper={formik.getFieldHelpers(
                                                "address"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "address"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "address"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                {/* footer */}
                <Modal.Footer>
                    <div className="w-100 d-flex row">
                        <Button
                            className="font-weight-bold flex-grow-1 col mr-3 AppButton"
                            variant="secondary"
                            onClick={handleClose}
                        >
                            {`Huỷ`}
                        </Button>
                        <Button
                            className={`font-weight-bold flex-grow-1 col ml-3 AppButton`}
                            variant="primary"
                            onClick={() => {
                                formik.handleSubmit();
                            }}
                        >
                            {isUpdatinggardenData ? (
                                <div className="my-auto">
                                    <span className="spinner spinner-loader spinner-white"></span>
                                </div>
                            ) : (
                                <div>Lưu lại</div>
                            )}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEditgarden;
