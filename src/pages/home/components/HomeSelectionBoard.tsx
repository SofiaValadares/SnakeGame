import React, { FC } from 'react';
import { CategorysList } from '../../../models/CategoryModel';
import { useSnakeTheme } from '../../../context/SnakeThemeContext';
import SnakeStripPreview from './SnakeStripPreview';

const HomeSelectionBoard: FC = () => {
  const {
    categoryIndex,
    competenceIndex,
    selectCategory,
    selectCompetence,
    stripeA,
    stripeB,
  } = useSnakeTheme();

  const selectedCategory = CategorysList[categoryIndex] ?? CategorysList[0];
  const competences = selectedCategory.competences;

  return (
    <div className="home-selection">
      <div className="home-selection__col">
        <h2 className="home-selection__title">Categorias</h2>
        <div
          className="home-selection__scroll"
          aria-label="Lista de categorias (com scroll se necessário)"
        >
          <ul className="ds-menu-list" role="listbox" aria-label="Categorias">
            {CategorysList.map((item, index) => {
              const isActive = index === categoryIndex;
              return (
                <li key={item.category}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`ds-menu-item${
                      isActive ? ' ds-menu-item--active' : ''
                    }`}
                    style={
                      isActive
                        ? { boxShadow: `inset 4px 0 0 ${item.color}` }
                        : undefined
                    }
                    onClick={() => selectCategory(index)}
                  >
                    {item.category}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="home-selection__col home-selection__col--center">
        <h2 className="home-selection__title">A tua cobra</h2>
        <div className="snake-strip-preview">
          <SnakeStripPreview stripeA={stripeA} stripeB={stripeB} />
        </div>
        <p className="home-selection__legend ds-caption">
          Listra 1 = categoria · Listra 2 = competência
        </p>
      </div>

      <div className="home-selection__col">
        <h2 className="home-selection__title">Competências</h2>
        <div
          className="home-selection__scroll"
          aria-label="Lista de competências (com scroll se necessário)"
        >
          {competences.length === 0 ? (
            <p className="ds-caption">Sem competências nesta categoria.</p>
          ) : (
            <ul className="ds-menu-list" role="listbox" aria-label="Competências">
              {competences.map((item, index) => {
                const isActive = index === competenceIndex;
                return (
                  <li key={item.competence}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      className={`ds-menu-item${
                        isActive ? ' ds-menu-item--active' : ''
                      }`}
                      style={
                        isActive
                          ? { boxShadow: `inset 4px 0 0 ${item.color}` }
                          : undefined
                      }
                      onClick={() => selectCompetence(index)}
                    >
                      {item.competence}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSelectionBoard;
