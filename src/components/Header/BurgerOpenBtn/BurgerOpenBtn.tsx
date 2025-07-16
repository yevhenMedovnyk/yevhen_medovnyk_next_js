import React from 'react';
import s from './BurgerOpenBtn.module.scss';
import { CgClose } from 'react-icons/cg';
import { CiMenuBurger } from 'react-icons/ci';

interface IBurgerOpenBtnProps {
	isBurgerMenuOpen: boolean;
	handleBurgerMenuClick: () => void;
}

const BurgerOpenBtn: React.FC<IBurgerOpenBtnProps> = ({
	isBurgerMenuOpen,
	handleBurgerMenuClick,
}) => {
	return (
		<div className={s.burgerOpenBtn}>
			<>
				{isBurgerMenuOpen ? (
					<CgClose
						style={isBurgerMenuOpen ? { color: 'white' } : {}}
						onClick={handleBurgerMenuClick}
						className={s.burgerCloseBtn}
					/>
				) : (
					<CiMenuBurger
						style={isBurgerMenuOpen ? { color: 'white' } : {}}
						onClick={() => handleBurgerMenuClick()}
						className={s.burgerOpenBtn}
					/>
				)}
			</>
		</div>
	);
};

export default BurgerOpenBtn;
