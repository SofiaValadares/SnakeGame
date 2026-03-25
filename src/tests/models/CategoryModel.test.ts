import { CategorysList } from '../../models/CategoryModel';

describe('CategorysList', () => {
  it('has at least one category', () => {
    expect(CategorysList.length).toBeGreaterThan(0);
  });

  it('each category has a non-empty competences array', () => {
    CategorysList.forEach((cat) => {
      expect(cat.competences.length).toBeGreaterThan(0);
      expect(cat.color).toMatch(/^#/);
      cat.competences.forEach((c) => {
        expect(c.color).toMatch(/^#/);
      });
    });
  });

  it('keeps desenvolvimento as the first category (default UI)', () => {
    expect(CategorysList[0].category).toContain('Desenvolvimento');
  });
});
