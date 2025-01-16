import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import api from "../../services/api";
import { Stack } from "@mui/material";
import { PaginationResponse } from "../../types/pagination.type";
import { Sanction } from "../../types/sanction.type";
import AddSanctionModal from "./AddSanction/AddSanctionModal";

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

  const columns: GridColDef[] = [
    { field: "type", headerName: "Sanction Type", width: 150 },
    { field: "state", headerName: "State", width: 150 },
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
  ];

  const newSanctionCreated = (): void => {
    fetchSanctions();
  };

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
    </>
  );
};

export default PlayerSanctions;
