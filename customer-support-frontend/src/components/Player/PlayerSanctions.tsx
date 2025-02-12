import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";
import api from "../../services/api";
import { Alert, Chip, Snackbar, Stack } from "@mui/material";
import { PaginationResponse } from "../../types/pagination.type";
import { Sanction, SanctionState } from "../../types/sanction.type";
import AddSanctionModal from "./AddSanction/AddSanctionModal";
import GavelIcon from "@mui/icons-material/Gavel";

interface Props {
  playerId: string;
}

const PlayerSanctions: React.FC<Props> = ({ playerId }) => {
  const [sanctions, setSanctions] = useState<Sanction[]>([]);
  const [sanctionCounts, setSanctionCounts] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 3,
    page: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const fetchSanctions = useCallback(async () => {
    try {
      const response = await api.get<PaginationResponse<Sanction>>(
        `/sanctions/${playerId}`,
        {
          params: {
            ...paginationModel,
          },
        }
      );
      setSanctions(response.data.data);
      setSanctionCounts(response.data.pagination.totalItems);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  }, [playerId, paginationModel]);

  const revokeSanction = useCallback(
    async (sanctionId: string) => {
      try {
        await api.patch(`/sanctions/revoke/${sanctionId}`);
        fetchSanctions();
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchSanctions]
  );

  const getStateChipColor = (
    state: SanctionState
  ): "error" | "warning" | "success" => {
    switch (state) {
      case SanctionState.Active:
        return "error";
      case SanctionState.Expired:
        return "warning";
      case SanctionState.Revoked:
        return "success";
    }
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "type", headerName: "Sanction Type", width: 150 },
      {
        field: "state",
        headerName: "State",
        width: 150,
        renderCell: (param) => (
          <Chip
            variant="outlined"
            label={param.value}
            color={getStateChipColor(param.value)}
          />
        ),
      },
      {
        field: "issued_at",
        type: "dateTime",
        headerName: "Issued",
        width: 200,
        valueGetter: (value) => {
          if (value) {
            return new Date(value);
          }
          return null;
        },
      },
      {
        field: "expires_at",
        type: "dateTime",
        headerName: "Expires Time",
        width: 200,
        valueGetter: (value) => {
          if (value) {
            return new Date(value);
          }
          return null;
        },
      },
      {
        field: "revoked_at",
        type: "dateTime",
        headerName: "Revoke Time",
        width: 200,
        valueGetter: (value) => {
          if (value) {
            return new Date(value);
          }
          return null;
        },
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => {
          const isActive = params.row.state === "active";
          return isActive
            ? [
                <GridActionsCellItem
                  icon={<GavelIcon />}
                  label="Revoke"
                  onClick={() => revokeSanction(params.id as string)}
                  showInMenu
                />,
              ]
            : [];
        },
      },
    ],
    [revokeSanction]
  );

  const newSanctionCreated = (): void => {
    fetchSanctions();
    setSnackbarMessage("Sanction added successfully!");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchSanctions();
  }, [fetchSanctions, paginationModel]);

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }} alignItems={"center"}>
        <AddSanctionModal onSanctionAdded={newSanctionCreated} />
      </Stack>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <DataGrid
          paginationMode="server"
          rowCount={sanctionCounts}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowHeight={100}
          rows={sanctions}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          isRowSelectable={() => false}
        />
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PlayerSanctions;
