from dataclasses import dataclass

import numpy as np

from rdumap.ghostumap.utils import _get_radii as get_radii


@dataclass
class OriginalPointModel:
    id: int
    x: float
    y: float
    radii: list[float]
    label: str | None
    neighbors: list[int]

    def to_dict(self):
        return {
            "id": self.id,
            "x": self.x,
            "y": self.y,
            "radii": self.radii,
            "instability": np.var(self.radii),
            "label": self.label,
            "neighbors": self.neighbors,
        }


class OriginalEmbedding:
    @staticmethod
    def build_model(
        original_embedding: np.ndarray,
        ghost_embedding: np.ndarray,
        neighbors: np.ndarray,
        label: np.ndarray | list[str] | None = None,
    ):
        if label is None:
            label = ["None"] * len(original_embedding)

        return [
            OriginalPointModel(
                id=i, x=x, y=y, radii=r.tolist(), label=str(l), neighbors=n.tolist()
            ).to_dict()
            for i, (x, y, r, l, n) in enumerate(
                zip(
                    original_embedding[:, 0],
                    original_embedding[:, 1],
                    get_radii(original_embedding, ghost_embedding),
                    label,
                    neighbors,
                )
            )
        ]
