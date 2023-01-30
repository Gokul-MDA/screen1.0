// import "./styles.css";
import {
  Grid,
  Button,
  Box,
  Drawer,
  Typography,
  TextField,
  Select,
  MenuItem,
  Link
} from "@mui/material";
import { Icon } from "@iconify/react";
import React, { useMemo, useState } from "react";
export default function App() {
  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [segment, setSegment] = useState("");
  const [selectedSegments, setSelectedSegments] = useState([]);
  const handleClose = () => setOpen(false);
  const segmentOptions = useMemo(
    () => [
      { label: "First Name", value: "first_name" },
      { label: "Last Name", value: "last_name" },
      { label: "Gender", value: "gender" },
      { label: "Age", value: "age" },
      { label: "Account Name", value: "account_name" },
      { label: "City", value: "city" },
      { label: "State", value: "state" }
    ],
    []
  );
  const handleAddSegment = () => {
    const selectedSchema = segmentOptions.find((s) => s.value === segment);
    const tempSelectedSchemas = [...selectedSegments, selectedSchema];
    setSelectedSegments(tempSelectedSchemas);
    setSegment("");
  };
  const removeSelectedSchema = (index) => {
    const tempSelectedSchemas = [...selectedSegments];
    tempSelectedSchemas.splice(index, 1);
    setSelectedSegments(tempSelectedSchemas);
  };


  return (
    <Grid container sx={{ p: 4, width: "100vw", height: "100vh" }}>
      <Grid item xs>
        <Button
          size={"small"}
          onClick={() => setOpen(true)}
          variant={"outlined"}
          sx={{ textTransform: "none" }}
        >
          Save segment
        </Button>
      </Grid>
      <Drawer
        open={open}
        anchor={"right"}
        PaperProps={{
          sx: {
            height: "100vh",
            width: "50vw"
          }
        }}
        transitionDuration={1000}
        // onClose={handleClose}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* header */}
          <Box
            sx={{
              p: 1,
              backgroundColor: "teal",
              display: "flex",
              alignItems: "center",
              gap: 2
            }}
          >
            <Icon
              icon={"material-symbols:arrow-back-ios-rounded"}
              color={"#fff"}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
            <Typography sx={{ color: "#fff" }}>Saving Segment</Typography>
          </Box>
          {/* drawerContent */}
          <Box sx={{ p: 2, width: "100%" }}>
            {/* input field */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <label> Enter the Name of the Segment</label>
              <TextField
                placeholder={"Name of the Segment"}
                autoComplete={"off"}
                value={segmentName}
                onChange={(event) => setSegmentName(event.target.value)}
              />
              <small>
                To save your segment,you need to add the schemasto build the
                query
              </small>
            </Box>
            {/* selected schemas dropdown */}
            {selectedSegments.length ? (
              <Box>
                {selectedSegments.map((schema, index) => (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      my: 2
                    }}
                  >
                    <Select
                      key={index}
                      sx={{ width: "90%" }}
                      value={selectedSegments[index]?.value}
                      onChange={(event) => {
                        const tempSelectedSchemas = [...selectedSegments];
                        const selectedSchemaObj = segmentOptions.find(
                          (s) => s.value === event.target.value
                        );
                        tempSelectedSchemas[index] = selectedSchemaObj;
                        setSelectedSegments(tempSelectedSchemas);
                      }}
                    >
                      {segmentOptions.map((segment, index) => (
                        <MenuItem value={segment.value}>
                          {segment.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <Icon
                      icon={"ic:round-minus"}
                      style={{ cursor: "pointer" }}
                      onClick={() => removeSelectedSchema(index)}
                    />
                  </Box>
                ))}
              </Box>
            ) : null}
            {/* available segment dropdown */}
            <Box sx={{ my: 2, width: "100%", marginTop: "50px" }}>
              <Select
                sx={{ width: "100%" }}
                value={segment}
                onChange={(event) => setSegment(event.target.value)}
                renderValue={
                  segment === ""
                    ? () => <Box>Add Scheme to Segment</Box>
                    : undefined
                }
                displayEmpty
              >
                {segmentOptions.map((segment, index) => (
                  <MenuItem value={segment.value}>{segment.label}</MenuItem>
                ))}
              </Select>
              {segment ? (
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleAddSegment}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    my: 2,
                    color: "teal"
                  }}
                >
                  <Icon icon={"material-symbols:add"} />
                  Add new schema
                </Link>
              ) : null}
            </Box>
          </Box>
        </Box>
        {/* Footer */}
        <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            height: '80px',
            backgroundColor: '#d3d3d3'
        }}>
        <Button size={"small"} style={{backgroundColor: 'teal', color: 'white', margin: '10px'}} onClick={()=>{
            console.log("output", {
            segment_name: segmentName,
            schema: selectedSegments.map((s) => ({ [s?.value]: s?.label }))
  });
        }}>Save the segment</Button>
            <Button size={"small"} style={{backgroundColor: 'white', color: 'red', margin: '10px'}} onClick={()=> handleClose()}>Cancel</Button>
        </Box>
      </Drawer>
    </Grid>
  );
}
