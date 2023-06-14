import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getFileAccessById, updateFileAccessById } from 'apiSdk/file-accesses';
import { Error } from 'components/error';
import { fileAccessValidationSchema } from 'validationSchema/file-accesses';
import { FileAccessInterface } from 'interfaces/file-access';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { EmployeeInterface } from 'interfaces/employee';
import { getEmployees } from 'apiSdk/employees';

function FileAccessEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<FileAccessInterface>(
    () => (id ? `/file-accesses/${id}` : null),
    () => getFileAccessById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FileAccessInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFileAccessById(id, values);
      mutate(updated);
      resetForm();
      router.push('/file-accesses');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<FileAccessInterface>({
    initialValues: data,
    validationSchema: fileAccessValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit File Access
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="file_name" mb="4" isInvalid={!!formik.errors?.file_name}>
              <FormLabel>File Name</FormLabel>
              <Input type="text" name="file_name" value={formik.values?.file_name} onChange={formik.handleChange} />
              {formik.errors.file_name && <FormErrorMessage>{formik.errors?.file_name}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<EmployeeInterface>
              formik={formik}
              name={'employee_id'}
              label={'Select Employee'}
              placeholder={'Select Employee'}
              fetcher={getEmployees}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.id}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'file_access',
  operation: AccessOperationEnum.UPDATE,
})(FileAccessEditPage);
