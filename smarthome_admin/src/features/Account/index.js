import BaseLayout from "general/components/BaseLayout";
import UserHelper from "general/helpers/UserHelper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

Account.propTypes = {};

function Account(props) {
    // MARK: --- Params ---
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentAccount } = useSelector((state) => state?.auth);

    useEffect(() => {
        document.title = "Thông tin quản trị viên | Sgarden"
     }, []);

    return (
        <BaseLayout>
            <div className="Account flex-column-fluid">
                <div className="container-xxl">
                    <div className="card card-flush mb-9">
                        <div
                            className="card-header rounded-top bgi-size-cover h-200px Account_CoverImage"
                            style={{
                                backgroundPosition: "100% 50%",
                                backgroundImage: `url(https://removal.ai/wp-content/uploads/2021/05/image9-1.png)`,
                            }}
                        ></div>
                        <div className="card-body mt-n19">
                            <div className="m-0">
                                <div className="d-flex flex-stack align-items-end pb-4 mt-n19">
                                    <div className=" position-relative">
                                        <div className="symbol symbol-120 symbol-lg-150 symbol-fixed mt-n3">
                                            <img
                                                src={
                                                    currentAccount?.avatar ||
                                                    UserHelper.getRandomAvatarUrl()
                                                }
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        UserHelper.getRandomAvatarUrl();
                                                }}
                                                alt="avatar"
                                                className="border border-white border-4"
                                                style={{
                                                    borderRadius: "20px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-weight-bolder font-size-h3 text-remaining">
                                        {currentAccount?.fullname}
                                    </p>
                                    <p className="text-muted">
                                        {currentAccount?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Account;
