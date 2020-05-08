import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import Text from 'components/Common/Text';

import styles from 'components/HoraeApp/AppNavbar/AppNavItem/AppNavItem.module.scss';

// TODO: Remove this code once it's no longer needed as a reference
// const StyledAppItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 10rem;
//   max-height: 10rem;
//   min-width: 10rem;
//   max-width: 10rem;
//   background-color: var(--color-bg-nav-item);
//   margin: var(--spacing-small);
//   border-radius: 1rem;
//   box-shadow: 0px 2px 16px 0px rgba(219, 219, 219, 0.2);
//   transition: all 0.2s;
//   cursor: pointer;
//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0px 10px 16px 0px rgba(219, 219, 219, 1);
//   }
// `;

interface IAppNavItemProps {
  title: string;
  icon: string;
  to: string;
  active?: boolean;
}

function AppNavItem({ title, icon, to }: IAppNavItemProps) {
  return (
    <Link
      to={to}
      className={styles.styledAppNavItem}
      activeClassName={styles.active}
    >
      <img src={icon} height={30} alt="" />
      <Text
        size="1.6rem"
        color="var(--color-nav-item-text)"
        margins={['tiny', 'none', 'none', 'none']}
      >
        {title}
      </Text>
    </Link>
  );
}

export default AppNavItem;
