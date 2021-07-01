import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { Header,Divider, Form , Message, Button} from "semantic-ui-react";
import { ErrorMessage, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";




export default observer(function AddNewPharmacyProductForm(){
    const{pharmacyStore,modalStore} = useStore();
 
    const selectedPharmacy ={
        productName : '',
        productCode : '',
        category : '',
        country : '',
        manufacturer : '',
        prescription : '',
        mg : '',
        price : '',
        quantity : '',
        error : null,
    }
    const category =[
        {key:'tablets', value :'Tablets' , text:'Tablets'},
        {key:'pills', value :'Pills' , text:'Pills'},
        {key:'capsules', value :'Capsules' , text:'Capsules'}
    ]    
    const prescription =[
        {key:'without prescription', value :'Without prescription' , text:'Without prescription'},
        {key:'with prescription', value :'With prescription' , text:'With prescription'},
    ]    
    const quantity =[
        {key:'1', value :'1' , text:'1'},
        {key:'2', value :'2' , text:'2'},
        {key:'3', value :'3' , text:'3'},
        {key:'4', value :'4' , text:'4'},
        {key:'5', value :'5' , text:'5'},
        {key:'6', value :'6' , text:'6'},
        {key:'7', value :'7' , text:'7'},
        {key:'8', value :'8' , text:'8'},
        {key:'9', value :'9' , text:'9'},
        {key:'10', value :'10' , text:'10'},
    ] 
    return(
     <>
                 <Header as='h1' content='Add Pharmacy Product' color='green' inverted />
            <Divider />
            <Formik
                initialValues={selectedPharmacy} 
                onSubmit={(values, { setErrors }) => pharmacyStore.createPharmacy(values).catch(error =>
                setErrors({ error }))}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty,errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <ErrorMessage
                            name='error' render={() =>
                            <Message negative content={errors.error} />}
                        />
                        <Header sub content='Add Pharmacy Product' />
                        <Form.Group widths={2}> 
                        <MyTextInput name='productName' placeholder='Product Name' label="Product Name:" />
                        <MyTextInput name='productCode' placeholder='Product Code' label="Product Code:"/>
                        </Form.Group>
                        <Form.Group widths={2}> 
                        <MySelectInput label="Category:" placeholder='Category' name='category' options={category}/>
                        <MyTextInput name='country' placeholder='Country' label="Country:"/>
                        </Form.Group>
                        <Form.Group widths={3}> 
                        <MyTextInput name='manufacturer' placeholder='Manufacturer' label="Manufacturer:"/>
                        <MySelectInput label="Prescription:" name='prescription' placeholder='Prescription' options={prescription}/>
                        <MyTextInput name='mg' placeholder='Mg' label="Mg:"/>
                        </Form.Group>
                        <Form.Group widths={2}>
                        <MyTextInput name='price' placeholder='Price' label="Price:"/>
                        <MySelectInput name='quantity' placeholder='Quantity' label="Quantity:" options={quantity}/>
                        </Form.Group>
                        <Divider />
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} positive type='submit' content='Submit'
                        />
                        <Button basic color='red' content='Cancel' onClick={modalStore.closeModal} />

                    </Form>
                )}
                
            </Formik>
     </>   
    )
})