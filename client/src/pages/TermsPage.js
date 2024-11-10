import { Box, Card, CardHeader, Container, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from '../components/settings';
import Terms from '../sections/Terms/Terms';

export default function TermsPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Page Six </title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack spacing={5}>
          <Card>
            <CardHeader title="Custom" sx={{ mb: 2 }} />
            <Box sx={{ height: 390 }}>
              <Terms />
            </Box>
          </Card>
        </Stack>
      </Container>
    </>
  );
}