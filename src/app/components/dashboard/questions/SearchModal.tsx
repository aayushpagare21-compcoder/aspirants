import { Dialog, DialogContent } from "../../ui/dialog";
import { SearchBar } from "../../shared/Header/SearchBar";

export const SearchModal = ({
  searchText,
  showSearchModal,
  setShowSearchModal,
  onChangeSearchText,
}: {
  searchText: string;
  showSearchModal: boolean;
  setShowSearchModal: (open: boolean) => void;
  onChangeSearchText: (s: string) => void;
}) => {
  return (
    <Dialog open={showSearchModal} onOpenChange={setShowSearchModal}>
      <DialogContent className="absolute top-[26px] h-[60px] w-[100%] px-1 py-0">
        <SearchBar
          searchText={searchText}
          onChangeSearchText={onChangeSearchText}
          searchBarStyles="p-0 block"
          containerClasses="p-0 m-0 h-[60px] w-[100%] border-none"
        />
      </DialogContent>
    </Dialog>
  );
};
