import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { DialogAnimate } from '../../components/animate';
import { RHFSelect, RHFTextField } from '../../components/hook-form';
import FormProvider from '../../components/hook-form/FormProvider';
import { updateSubCategory, addSubCategory } from '../../redux/SubCategory/actions';

const Schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required'),
  categories_id:Yup.string().required('Categories is required'),
});

const statuses = [
  { id: 'Active', title: 'Active' },
  { id: 'Draft', title: 'Draft' },
  { id: 'Inactive', title: 'Inactive' },
];

const CategorySubForm = ({ handleClose, currentRow }) => {
  const defaultValues = currentRow;
  const dispatch = useDispatch();
  const [value, setValue] = useState([]);

  const categories = useSelector((state) => state.Category.categories);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const formattedData = categories.map((item, index) => ({
        id: item._id,
        title: item.name,
      }));
      setValue(formattedData);
    }
  }, [categories]);

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = (data) => {
    console.log("dddddd",data)
    const categoryData = {
      name: data.name,
      description: data.description,
      status: data.status,
      parentCategory:data?.categories_id
    };
    if (data._id) {
      categoryData._id = data._id;
      dispatch(updateSubCategory(data._id, categoryData));
    } else {
      dispatch(addSubCategory(categoryData));
    }
    handleClose();
  };

  return (
    <>
      <DialogAnimate
        onClose={handleClose}
        title={currentRow._id ? 'Update Product' : 'Add Product'}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} p={3} className="css-1lwbda4-MuiStack-root">
            <RHFTextField name="name" label="Name *" autoFocus />
            <RHFTextField name="description" label="Description *" />
            <RHFSelect name="status" label="Status *" options={statuses} />
            <RHFSelect name="categories_id" label="Categories Title *" options={value} />
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="flex-end" p={3}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
          {currentRow._id ? 'Update' : 'Save'}
          </Button>
          </Stack>
        </FormProvider>
      </DialogAnimate>
    </>
  );
};

CategorySubForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  currentRow: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default CategorySubForm;
