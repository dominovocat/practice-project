import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import CONTANTS from "../../constants";
import { setOffer, clearAddOfferError } from "../../actions/actionCreator";
import styles from "./OfferForm.module.sass";
import ImageUpload from "../InputComponents/ImageUpload/ImageUpload";
import FormInput from "../FormInput/FormInput";
import Schems from "../../validators/validationSchems";
import Error from "../Error/Error";
import { bindActionCreators } from "redux";

const OfferForm = (props) => {
  const { addOfferError } = useSelector((state) => state.contestByIdStore);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      setOffer,
      clearAddOfferError,
    },
    dispatch
  );

  const renderOfferInput = () => {
    if (props.contestType === CONTANTS.LOGO_CONTEST) {
      return (
        <ImageUpload
          name="offerData"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
      );
    }
    return (
      <FormInput
        name="offerData"
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type="text"
        label="your suggestion"
      />
    );
  };

  const setOffer = (values, { resetForm }) => {
    actions.clearOfferError();
    const data = new FormData();
    const { contestId, contestType, customerId } = props;
    data.append("contestId", contestId);
    data.append("contestType", contestType);
    data.append("offerData", values.offerData);
    data.append("customerId", customerId);
    actions.setNewOffer(data);
    resetForm();
  };

  const { valid, clearOfferError } = props;
  const validationSchema =
    props.contestType === CONTANTS.LOGO_CONTEST
      ? Schems.LogoOfferSchema
      : Schems.TextOfferSchema;
  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={clearOfferError}
        />
      )}
      <Formik
        onSubmit={setOffer}
        initialValues={{
          offerData: "",
        }}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          {renderOfferInput()}
          {valid && (
            <button type="submit" className={styles.btnOffer}>
              Send Offer
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setNewOffer: (data) => dispatch(setOffer(data)),
  clearOfferError: () => dispatch(clearAddOfferError()),
});

// const mapStateToProps = (state) => {
//   const { addOfferError } = state.contestByIdStore;
//   return { addOfferError };
// };

export default connect(mapDispatchToProps)(OfferForm);
