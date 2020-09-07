import { shallowMount } from "@vue/test-utils";
import GameBoard from "@/components/GameBoard.vue";

describe("GameBoard.vue", () => {
  it("component is a vue instance", () => {
    const wrapper = shallowMount(GameBoard);

    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("cols and rows should receive as a props correctly", () => {
    const rows = [0, 1, 2, 3, 4, 5], cols = [0, 1, 2, 3, 4, 5];

    const wrapper = shallowMount(GameBoard, {
      propsData: {
        rows,
        cols,
      },
    });

    expect(wrapper.vm.$props.rows).toBe(rows);
    expect(wrapper.vm.$props.cols).toBe(cols);
  });

  it("cols and rows should render correct board", () => {
    const rows = [0, 1, 2, 3, 4, 5], cols = [0, 1, 2, 3, 4, 5];

    const wrapper = shallowMount(GameBoard, {
      propsData: {
        rows,
        cols,
      },
    });

    expect(wrapper.findAll('.row').length).toBe(rows.length);
    expect(wrapper.findAll('.col').length).toBe(cols.length * rows.length);
  });

  it("onClick square should emit 'fill' event", () => {
    const rows = [0, 1, 2, 3, 4, 5], cols = [0, 1, 2, 3, 4, 5];

    const wrapper = shallowMount(GameBoard, {
      propsData: {
        rows,
        cols,
      },
    });

    wrapper.find('.col').trigger('click');
    expect(wrapper.emitted().fill).toBeTruthy();
  });
});
