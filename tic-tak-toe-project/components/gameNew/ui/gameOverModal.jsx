import { UiButton } from "../../uikit/uiButton";
import { UiModal } from "../../uikit/uiModal";

export function GameOverModal({ winnerName, players }) {
  return (
    <UiModal
      width="md"
      isOpen={winnerName}
      onClose={() => {
        console.log("Close");
      }}
    >
      <UiModal.Header>Игра завершена!</UiModal.Header>
      <UiModal.Body>
        <div className="text-sm">
          Победитель: <span className="text-teal-600">{winnerName}</span>
        </div>
        <div className="justify-between grid grid-cols-2 gap-3 mt-2">
          {players}
        </div>
      </UiModal.Body>
      <UiModal.Footer>
        <UiButton size="md" variant="outline">
          Вернуться
        </UiButton>
        <UiButton size="md" variant="primary">
          Играть снова
        </UiButton>
      </UiModal.Footer>
    </UiModal>
  );
}
