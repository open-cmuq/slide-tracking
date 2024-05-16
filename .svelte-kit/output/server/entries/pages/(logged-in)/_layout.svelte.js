import { c as create_ssr_component, v as validate_component, d as add_attribute, f as each, e as escape, h as createEventDispatcher, b as subscribe, i as compute_slots, g as getContext, o as onDestroy, s as setContext, j as set_store_value } from "../../../chunks/index3.js";
import { M as Mdi_icon } from "../../../chunks/coverslipTable.svelte_svelte_type_style_lang.js";
import { c as createEventForwarder, D as Dropdown, P as Popup, A as Arrow } from "../../../chunks/popup.js";
import "devalue";
import uid from "uid";
import { S as Slide, C as Coverslip } from "../../../chunks/slide.js";
import { w as writable } from "../../../chunks/index2.js";
import "qrcode";
import { s as stainingFields } from "../../../chunks/stainining_fields.js";
import { mdiChevronDown, mdiChevronRight, mdiAsterisk, mdiPlus, mdiClipboardTextMultipleOutline, mdiTestTube, mdiMirrorRectangle } from "@mdi/js";
import { format } from "date-fns";
import { B as Button_item } from "../../../chunks/button-item.js";
import { S as Section, N as Navbar } from "../../../chunks/navbar.js";
import { p as page } from "../../../chunks/stores.js";
import { L as Link_item } from "../../../chunks/link-item.js";
import { E as Empty_list } from "../../../chunks/empty-list.js";
const css$g = {
  code: ".wrapper.svelte-lz2vng{display:grid;grid-template-columns:max-content 1fr;gap:var(--br-size-6)}",
  map: null
};
const Create_coverslip_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open } = $$props;
  let { slideId } = $$props;
  let shape = "round";
  let positionX;
  let positionY;
  let coverslips = [];
  async function updateCoverslips() {
    coverslips = await fetch(`/api/v1/coverslips?slideId=${slideId}`).then((response) => response.json()).catch((error) => {
      console.error(error);
    });
  }
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.slideId === void 0 && $$bindings.slideId && slideId !== void 0)
    $$bindings.slideId(slideId);
  $$result.css.add(css$g);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (open)
        updateCoverslips();
    }
    $$rendered = `<div style="display: contents; --br-dialog-root-max-block-size:${"min(90dvb, 100%);"};">${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Create coverslip",
        action: "/coverslip/blah?/new",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<input type="${"hidden"}" name="${"slideId"}"${add_attribute("value", slideId, 0)}>
	<input type="${"hidden"}" name="${"positionX"}"${add_attribute("value", positionX, 0)}>
	<input type="${"hidden"}" name="${"positionY"}"${add_attribute("value", positionY, 0)}>
	<div class="${"wrapper svelte-lz2vng"}">${validate_component(Slide, "Slide").$$render($$result, { slideId }, {}, {
            default: () => {
              return `${each(coverslips, (coverslip, i) => {
                return `${validate_component(Coverslip, "Coverslip").$$render($$result, { coverslip }, {}, {
                  default: () => {
                    return `#${escape(i + 1)}
				`;
                  }
                })}`;
              })}
			${validate_component(Coverslip, "Coverslip").$$render(
                $$result,
                {
                  active: true,
                  draggable: true,
                  coverslip: { positionX, positionY, shape },
                  position: "auto"
                },
                {},
                {}
              )}`;
            }
          })}
		<div><div class="${"single-column"}">${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Specimen",
              name: "specimen",
              placeholder: "Specimen",
              required: true
            },
            {},
            {}
          )}</div>
			<div class="${"single-column"}">${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Coating",
              name: "coating",
              placeholder: "Coating",
              required: true
            },
            {},
            {}
          )}</div>
			${validate_component(Group, "Group").$$render($$result, { label: "Shape", name: "shape" }, {}, {
            default: () => {
              return `<div class="${"double-column"}">${validate_component(Radio, "Radio").$$render(
                $$result,
                {
                  label: "Round",
                  value: "round",
                  checked: true
                },
                {},
                {}
              )}
					${validate_component(Radio, "Radio").$$render($$result, { label: "Square", value: "square" }, {}, {})}</div>`;
            }
          })}</div></div>`;
        }
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$f = {
  code: ".field.svelte-18ozl24{display:flex;gap:15px}button.remove.svelte-18ozl24{margin-block-start:28px}",
  map: null
};
const Create_staining_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open } = $$props;
  let { coverslipId } = $$props;
  let fields = [{ field: "", value: "" }];
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.coverslipId === void 0 && $$bindings.coverslipId && coverslipId !== void 0)
    $$bindings.coverslipId(coverslipId);
  $$result.css.add(css$f);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div style="display: contents; --br-dialog-root-max-block-size:${"min(90dvb, 100%);"};">${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Create staining",
        action: "/coverslip/" + coverslipId + "/staining?/new",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<input type="${"hidden"}" name="${"coverslipId"}"${add_attribute("value", coverslipId, 0)}>
	<button type="${"button"}">Add staining field</button>
	${each(fields, (_field, index) => {
            return `<div class="${"field svelte-18ozl24"}"><div class="${"double-column"}">${validate_component(Select, "Select").$$render(
              $$result,
              {
                label: "Field",
                name: `fields[${index}][name]`,
                required: true
              },
              {},
              {
                default: () => {
                  return `${each(Object.entries(stainingFields), ([field, name]) => {
                    return `<option${add_attribute("value", field, 0)}>${escape(name)}</option>`;
                  })}
				`;
                }
              }
            )}
				${validate_component(Input, "Input").$$render(
              $$result,
              {
                label: "Value",
                name: `fields[${index}][value]`,
                placeholder: "Value",
                required: true
              },
              {},
              {}
            )}</div>
			<button class="${"remove svelte-18ozl24"}" type="${"button"}">Remove</button>
		</div>`;
          })}`;
        }
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$e = {
  code: ".wrapper.svelte-lz2vng{display:grid;grid-template-columns:max-content 1fr;gap:var(--br-size-6)}",
  map: null
};
const Edit_coverslip_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open } = $$props;
  let { coverslip: editedCoverslip } = $$props;
  let coverslips = [];
  async function updateCoverslips() {
    coverslips = await fetch(`/api/v1/coverslips?slideId=${editedCoverslip?.slideId}`).then((response) => response.json()).catch((error) => {
      console.error(error);
    });
  }
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.coverslip === void 0 && $$bindings.coverslip && editedCoverslip !== void 0)
    $$bindings.coverslip(editedCoverslip);
  $$result.css.add(css$e);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (open)
        updateCoverslips();
    }
    $$rendered = `<div style="display: contents; --br-dialog-root-max-block-size:${"min(90dvb, 100%);"};">${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Edit coverslip",
        action: "/coverslip/" + editedCoverslip?.id + "?/edit",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<input type="${"hidden"}" name="${"id"}"${add_attribute("value", editedCoverslip?.id, 0)}>
	<input type="${"hidden"}" name="${"slideId"}"${add_attribute("value", editedCoverslip?.slideId, 0)}>
	<input type="${"hidden"}" name="${"positionX"}"${add_attribute("value", editedCoverslip?.positionX, 0)}>
	<input type="${"hidden"}" name="${"positionY"}"${add_attribute("value", editedCoverslip?.positionY, 0)}>
	<div class="${"wrapper svelte-lz2vng"}">${validate_component(Slide, "Slide").$$render($$result, { slideId: editedCoverslip?.slideId }, {}, {
            default: () => {
              return `${each(coverslips, (coverslip, i) => {
                return `${coverslip.id === editedCoverslip?.id ? `${validate_component(Coverslip, "Coverslip").$$render(
                  $$result,
                  {
                    coverslip: editedCoverslip,
                    active: true,
                    draggable: true
                  },
                  {},
                  {
                    default: () => {
                      return `#${escape(i + 1)}
					`;
                    }
                  }
                )}` : `${validate_component(Coverslip, "Coverslip").$$render($$result, { coverslip }, {}, {
                  default: () => {
                    return `#${escape(i + 1)}
					`;
                  }
                })}`}`;
              })}`;
            }
          })}
		<div><div class="${"single-column"}">${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Specimen",
              name: "specimen",
              placeholder: "Specimen",
              value: editedCoverslip?.specimen,
              required: true
            },
            {},
            {}
          )}</div>
			<div class="${"single-column"}">${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Coating",
              name: "coating",
              placeholder: "Coating",
              value: editedCoverslip?.coating,
              required: true
            },
            {},
            {}
          )}</div>
			${validate_component(Group, "Group").$$render($$result, { label: "Shape", name: "shape" }, {}, {
            default: () => {
              return `<div class="${"double-column"}">${validate_component(Radio, "Radio").$$render(
                $$result,
                {
                  label: "Round",
                  value: "round",
                  checked: editedCoverslip?.shape === "round"
                },
                {},
                {}
              )}
					${validate_component(Radio, "Radio").$$render(
                $$result,
                {
                  label: "Square",
                  value: "square",
                  checked: editedCoverslip?.shape === "square"
                },
                {},
                {}
              )}</div>`;
            }
          })}</div></div>`;
        }
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$d = {
  code: ".wrapper.svelte-lz2vng{display:grid;grid-template-columns:max-content 1fr;gap:var(--br-size-6)}",
  map: null
};
const Edit_coverslip_dialog2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open } = $$props;
  let { coverslip: editedCoverslip } = $$props;
  async function updateCoverslips() {
    await fetch(`/api/v1/coverslips?slideId=${editedCoverslip?.slideId}`).then((response) => response.json()).catch((error) => {
      console.error(error);
    });
  }
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.coverslip === void 0 && $$bindings.coverslip && editedCoverslip !== void 0)
    $$bindings.coverslip(editedCoverslip);
  $$result.css.add(css$d);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (open)
        updateCoverslips();
    }
    $$rendered = `<div style="display: contents; --br-dialog-root-max-block-size:${"min(90dvb, 100%);"};">${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Edit well",
        action: "/coverslip/" + editedCoverslip?.id + "?/edit",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<input type="${"hidden"}" name="${"id"}"${add_attribute("value", editedCoverslip?.id, 0)}>
	<input type="${"hidden"}" name="${"slideId"}"${add_attribute("value", editedCoverslip?.slideId, 0)}>
	<input type="${"hidden"}" name="${"positionX"}"${add_attribute("value", 0, 0)}>
	<input type="${"hidden"}" name="${"positionY"}"${add_attribute("value", 0, 0)}>
	<input type="${"hidden"}" name="${"shape"}"${add_attribute("value", "round", 0)}>
	<div class="${"wrapper svelte-lz2vng"}"><div class="${"single-column"}">${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Specimen",
              name: "specimen",
              placeholder: "Specimen",
              value: editedCoverslip?.specimen,
              required: true
            },
            {},
            {}
          )}</div>
			<div class="${"single-column"}">${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Coating",
              name: "coating",
              placeholder: "Coating",
              value: editedCoverslip?.coating,
              required: true
            },
            {},
            {}
          )}</div></div>`;
        }
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$c = {
  code: ".wrapper.svelte-lz2vng{display:grid;grid-template-columns:max-content 1fr;gap:var(--br-size-6)}",
  map: null
};
const Edit_coverslips_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open } = $$props;
  let { coverslipids = [""] } = $$props;
  let { slideid } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.coverslipids === void 0 && $$bindings.coverslipids && coverslipids !== void 0)
    $$bindings.coverslipids(coverslipids);
  if ($$props.slideid === void 0 && $$bindings.slideid && slideid !== void 0)
    $$bindings.slideid(slideid);
  $$result.css.add(css$c);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div style="display: contents; --br-dialog-root-max-block-size:${"min(90dvb, 100%);"};">${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Edit wells",
        action: "/coverslip/" + coverslipids[0]?.id + "?/edits",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<input type="${"hidden"}" name="${"ids"}"${add_attribute("value", coverslipids, 0)}>
	<input type="${"hidden"}" name="${"slideId"}"${add_attribute("value", slideid, 0)}>
	<input type="${"hidden"}" name="${"positionX"}"${add_attribute("value", 0, 0)}>
	<input type="${"hidden"}" name="${"positionY"}"${add_attribute("value", 0, 0)}>
	<input type="${"hidden"}" name="${"shape"}"${add_attribute("value", "round", 0)}>
	<div class="${"wrapper svelte-lz2vng"}"><div class="${"single-column"}">${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Specimen",
              name: "specimen",
              placeholder: "Specimen",
              value: "",
              required: true
            },
            {},
            {}
          )}</div>
			<div class="${"single-column"}">${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Coating",
              name: "coating",
              placeholder: "Coating",
              value: "",
              required: true
            },
            {},
            {}
          )}</div></div>`;
        }
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$b = {
  code: ".field.svelte-18ozl24{display:flex;gap:15px}button.remove.svelte-18ozl24{margin-block-start:28px}",
  map: null
};
const Edit_staining_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open } = $$props;
  let { staining } = $$props;
  let coverslipId;
  let fields;
  let id;
  function updateValues(staining2) {
    ({ id, coverslipId } = staining2);
    fields = staining2.fields.map((field) => ({ ...field, op: "edit" }));
  }
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.staining === void 0 && $$bindings.staining && staining !== void 0)
    $$bindings.staining(staining);
  $$result.css.add(css$b);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (staining)
        updateValues(staining);
    }
    $$rendered = `<div style="display: contents; --br-dialog-root-max-block-size:${"min(90dvb, 100%);"};">${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Edit staining",
        action: "/coverslip/" + coverslipId + "/staining?/edit",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<input type="${"hidden"}" name="${"id"}"${add_attribute("value", id, 0)}>
	<input type="${"hidden"}" name="${"coverslipId"}"${add_attribute("value", coverslipId, 0)}>
	${each(fields, (field, index) => {
            return `${field.op === "delete" ? `<input type="${"hidden"}" name="${"fields[" + escape(index, true) + "][op]"}" value="${"delete"}">
			<input type="${"hidden"}" name="${"fields[" + escape(index, true) + "][id]"}"${add_attribute("value", field.id, 0)}>` : ``}`;
          })}
	<button type="${"button"}">Add staining field</button>
	${each(fields, (field, index) => {
            return `${field.op !== "delete" ? `<div class="${"field svelte-18ozl24"}"><div class="${"double-column"}">${field.op === "edit" ? `<input type="${"hidden"}" name="${"fields[" + escape(index, true) + "][id]"}"${add_attribute("value", field.id, 0)}>` : ``}
					<input type="${"hidden"}" name="${"fields[" + escape(index, true) + "][op]"}"${add_attribute("value", field.op, 0)}>
					${validate_component(Select, "Select").$$render(
              $$result,
              {
                label: "Field",
                name: "fields[" + index + "][name]",
                required: true
              },
              {},
              {
                default: () => {
                  return `${each(Object.entries(stainingFields), ([fieldId, name]) => {
                    return `${field.name === fieldId ? `${escape(console.log("selected", { name }))}
								<option${add_attribute("value", fieldId, 0)} selected>${escape(name)}</option>` : `<option${add_attribute("value", fieldId, 0)}>${escape(name)}</option>`}`;
                  })}
					`;
                }
              }
            )}
					${validate_component(Input, "Input").$$render(
              $$result,
              {
                label: "Value",
                name: "fields[" + index + "][value]",
                placeholder: "Value",
                value: field.value,
                required: true
              },
              {},
              {}
            )}</div>
				<button class="${"remove svelte-18ozl24"}" type="${"button"}">Remove</button>
			</div>` : ``}`;
          })}`;
        }
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Delete_coverslip_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { coverslip } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.coverslip === void 0 && $$bindings.coverslip && coverslip !== void 0)
    $$bindings.coverslip(coverslip);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Delete coverslip?",
        action: "/coverslip/" + coverslip?.id + "?/delete",
        size: "narrow",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<footer class="${"br-dialog-inline-section"}" slot="${"footer"}"><button>Delete</button>
		<button class="${"br-button-primary"}" type="${"reset"}">Cancel
		</button></footer>`;
        },
        default: () => {
          return `This will delete all nested coverslip stainings and files, and cannot be undone.
	<input type="${"hidden"}" name="${"id"}"${add_attribute("value", coverslip?.id, 0)}>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Delete_experiment_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { experiment } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.experiment === void 0 && $$bindings.experiment && experiment !== void 0)
    $$bindings.experiment(experiment);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Delete '" + experiment?.title + "'?",
        action: "/experiments?/delete",
        size: "narrow",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<footer class="${"br-dialog-inline-section"}" slot="${"footer"}"><button>Delete</button>
		<button class="${"br-button-primary"}" type="${"reset"}">Cancel
		</button></footer>`;
        },
        default: () => {
          return `This will delete all nested slides and coverslips, and cannot be undone.
	<input type="${"hidden"}" name="${"id"}"${add_attribute("value", experiment?.id, 0)}>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Delete_file_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { file } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.file === void 0 && $$bindings.file && file !== void 0)
    $$bindings.file(file);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Delete file?",
        action: "/coverslip/" + file?.coverslipId + "/files?/delete",
        size: "narrow",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<footer class="${"br-dialog-inline-section"}" slot="${"footer"}"><button>Delete</button>
		<button class="${"br-button-primary"}" type="${"reset"}">Cancel
		</button></footer>`;
        },
        default: () => {
          return `This action cannot be undone.
	<input type="${"hidden"}" name="${"id"}"${add_attribute("value", file?.id, 0)}>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Delete_project_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { project } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Delete '" + project?.title + "'?",
        action: "/projects?/delete",
        size: "narrow",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<footer class="${"br-dialog-inline-section"}" slot="${"footer"}"><button>Delete</button>
		<button class="${"br-button-primary"}" type="${"reset"}">Cancel
		</button></footer>`;
        },
        default: () => {
          return `This will delete all nested experiments and slides, and cannot be undone.
	<input type="${"hidden"}" name="${"id"}"${add_attribute("value", project?.id, 0)}>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Delete_slide_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let header;
  let { open = false } = $$props;
  let { slide } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.slide === void 0 && $$bindings.slide && slide !== void 0)
    $$bindings.slide(slide);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    header = slide?.title ? `Delete '${slide?.title}'?` : slide?.type === "plate" ? "Delete plate" : "Delete slide";
    $$rendered = `${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header,
        action: "/slides?/delete",
        size: "narrow",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<footer class="${"br-dialog-inline-section"}" slot="${"footer"}"><button>Delete</button>
		<button class="${"br-button-primary"}" type="${"reset"}">Cancel
		</button></footer>`;
        },
        default: () => {
          return `This will delete all nested coverslips and coverslip data, and cannot be undone.
	<input type="${"hidden"}" name="${"id"}"${add_attribute("value", slide?.id, 0)}>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Delete_staining_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { staining } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.staining === void 0 && $$bindings.staining && staining !== void 0)
    $$bindings.staining(staining);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Delete staining?",
        action: "/coverslip/" + staining?.id + "/staining?/delete",
        size: "narrow",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<footer class="${"br-dialog-inline-section"}" slot="${"footer"}"><button>Delete</button>
		<button class="${"br-button-primary"}" type="${"reset"}">Cancel
		</button></footer>`;
        },
        default: () => {
          return `This action cannot be undone.
	<input type="${"hidden"}" name="${"id"}"${add_attribute("value", staining?.id, 0)}>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Experiment_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let action;
  let header;
  let id;
  let projectId;
  let title;
  let { op } = $$props;
  let { open } = $$props;
  let { experiment = void 0 } = $$props;
  let projects = [];
  if ($$props.op === void 0 && $$bindings.op && op !== void 0)
    $$bindings.op(op);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.experiment === void 0 && $$bindings.experiment && experiment !== void 0)
    $$bindings.experiment(experiment);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    action = op === "edit" ? "/experiments?/edit" : "/experiments?/new";
    header = op === "create" ? "Edit project" : "Create project";
    id = experiment?.id ?? "";
    projectId = experiment?.projectId ?? "";
    title = experiment?.title ?? "";
    {
      if (open) {
        projects = [];
        (async () => {
          projects = await fetch("/api/v1/projects").then((request) => request.json()).catch(() => []);
        })();
      }
    }
    $$rendered = `${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      { header, action, open },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${op === "edit" ? `<input type="${"hidden"}" name="${"id"}"${add_attribute("value", id, 0)}>` : ``}
	${validate_component(Select, "Select").$$render(
            $$result,
            {
              label: "Project",
              placeholder: "Select a project",
              required: true,
              name: "projectId"
            },
            {},
            {
              default: () => {
                return `${each(projects, ({ id: id2, title: title2 }) => {
                  return `<option${add_attribute("value", id2, 0)} ${id2 === projectId ? "selected" : ""}>${escape(title2)}</option>`;
                })}`;
              }
            }
          )}
	${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Experiment title",
              name: "title",
              placeholder: "Untitled experiment",
              value: title,
              required: true
            },
            {},
            {}
          )}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Project_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let action;
  let header;
  let id;
  let title;
  let { op } = $$props;
  let { open } = $$props;
  let { project = void 0 } = $$props;
  if ($$props.op === void 0 && $$bindings.op && op !== void 0)
    $$bindings.op(op);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    action = op === "edit" ? "/projects?/edit" : "/projects?/new";
    header = op === "edit" ? "Edit project" : "Create project";
    id = project?.id ?? "";
    title = project?.title ?? "";
    $$rendered = `${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      { header, action, open },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${op === "edit" ? `<input type="${"hidden"}" name="${"id"}"${add_attribute("value", id, 0)}>` : ``}
	${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Project title",
              name: "title",
              placeholder: "Untitled project",
              value: title,
              required: true
            },
            {},
            {}
          )}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const css$a = {
  code: ".centered.svelte-y2lvci{justify-content:center}",
  map: null
};
const Slide_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let action;
  let boxNumber;
  let boxPosition;
  let comments;
  let experimentId;
  let header;
  let id;
  let observedOn;
  let title;
  let { op } = $$props;
  let { open } = $$props;
  let { slide = void 0 } = $$props;
  let experiments = [];
  if ($$props.op === void 0 && $$bindings.op && op !== void 0)
    $$bindings.op(op);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.slide === void 0 && $$bindings.slide && slide !== void 0)
    $$bindings.slide(slide);
  $$result.css.add(css$a);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    action = op === "edit" ? "/slides?/edit" : "/slides?/new";
    boxNumber = slide?.boxNumber ?? void 0;
    boxPosition = slide?.boxPosition ?? void 0;
    comments = slide?.comments ?? "";
    experimentId = slide?.experimentId ?? "";
    header = op === "edit" ? slide?.type === "plate" ? "Edit plate" : "Edit slide" : "Create slide/plate";
    id = slide?.id ?? "";
    observedOn = slide?.observedOn ? format(new Date(slide.observedOn), "yyyy-MM-dd") : new Date().toISOString().split("T")[0];
    title = slide?.title ?? "";
    slide?.type ?? "slide";
    {
      if (open) {
        (async () => {
          experiments = await fetch("/api/v1/experiments").then((response) => response.json()).catch(() => []);
        })();
      }
    }
    $$rendered = `${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      { header, action, open },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${op === "edit" ? `<input type="${"hidden"}" name="${"id"}"${add_attribute("value", id, 0)}>` : ``}
	<div class="${"single-column"}">${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Title",
              name: "title",
              placeholder: "Slide/Plate title",
              value: title,
              required: true
            },
            {},
            {}
          )}</div>
	${op != "edit" ? `${validate_component(Group, "Group").$$render($$result, { label: "Choose the type", name: "type" }, {}, {
            default: () => {
              return `<div class="${"double-column centered svelte-y2lvci"}">${validate_component(Radio, "Radio").$$render(
                $$result,
                {
                  label: "Slide",
                  value: "slide",
                  checked: true
                },
                {},
                {}
              )}
			${validate_component(Radio, "Radio").$$render($$result, { label: "Plate", value: "plate" }, {}, {})}</div>`;
            }
          })}` : ``}
	<div class="${"double-column"}">${validate_component(Select, "Select").$$render(
            $$result,
            {
              label: "Experiment",
              placeholder: "Select an experiment",
              required: true,
              name: "experimentId"
            },
            {},
            {
              default: () => {
                return `${each(experiments, ({ id: id2, title: title2 }) => {
                  return `<option${add_attribute("value", id2, 0)} ${id2 === experimentId ? "selected" : ""}>${escape(title2)}</option>`;
                })}`;
              }
            }
          )}
		${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Observed date",
              name: "observedOn",
              value: format(new Date(observedOn), "yyyy-MM-dd"),
              required: true,
              type: "date"
            },
            {},
            {}
          )}</div>
	<div class="${"double-column"}">${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Box number",
              name: "boxNumber",
              placeholder: "5",
              min: 1,
              value: boxNumber,
              type: "number"
            },
            {},
            {}
          )}
		${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Position",
              name: "boxPosition",
              placeholder: "21",
              min: 1,
              value: boxPosition,
              type: "number"
            },
            {},
            {}
          )}</div>
	${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Comments",
              name: "comments",
              placeholder: "Comments",
              value: comments,
              type: "textarea"
            },
            {},
            {}
          )}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Upload_coverslip_files_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open } = $$props;
  let { coverslipId } = $$props;
  let files;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.coverslipId === void 0 && $$bindings.coverslipId && coverslipId !== void 0)
    $$bindings.coverslipId(coverslipId);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div style="display: contents; --br-dialog-root-max-block-size:${"min(90dvb, 100%);"};">${validate_component(Dialogform, "DialogForm").$$render(
      $$result,
      {
        header: "Upload file",
        action: "/coverslip/" + coverslipId + "/files?/new",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<input type="${"hidden"}" name="${"coverslipId"}"${add_attribute("value", coverslipId, 0)}>
	${validate_component(File, "Inputs.File").$$render(
            $$result,
            {
              multiple: true,
              name: "files",
              value: files
            },
            {
              value: ($$value) => {
                files = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$9 = {
  code: "html:has(dialog[open].modal){overflow:hidden}dialog.svelte-1s9jqu8{display:flex;flex-direction:column;align-items:start;position:fixed;max-inline-size:var(--br-dialog-root-max-inline-size);max-block-size:var(--br-dialog-root-max-block-size);margin:auto;inset:0;border-radius:4px;box-shadow:var(--br-dialog-root-box-shadow);z-index:100000;overflow:hidden;transition:opacity .5s cubic-bezier(.25, 0, .3, 1);background-color:var(--br-dark, #222) var(--br-light, #fff);color:inherit;border:1px solid transparent;padding-block:var(--br-dialog-root-padding-block, 16px);padding-inline:var(--br-dialog-root-padding-inline, 24px)}dialog.svelte-1s9jqu8{border-block-start:var(--br-dark, 1px solid #394047)}@media(prefers-reduced-motion: no-preference){dialog.svelte-1s9jqu8{animation:svelte-1s9jqu8-slide-out-down .5s cubic-bezier(.25, 0, .3, 1) forwards;animation-timing-function:cubic-bezier(.5, -.5, .1, 1.5)}}@media(max-width: 768px){dialog.modal.svelte-1s9jqu8{margin-block-end:0;border-end-end-radius:0;border-end-start-radius:0}}@media(prefers-reduced-motion: no-preference){dialog.modal.svelte-1s9jqu8{animation:svelte-1s9jqu8-slide-out-down .5s cubic-bezier(.25, 0, .3, 1) forwards;animation-timing-function:cubic-bezier(.5, -.5, .1, 1.5)}dialog[open].svelte-1s9jqu8{animation:svelte-1s9jqu8-slide-in-up .5s cubic-bezier(.25, 0, .3, 1) forwards}}@keyframes svelte-1s9jqu8-slide-out-down{to{transform:translateY(100%) }}@keyframes svelte-1s9jqu8-slide-in-up{from{transform:translateY(100%) }}dialog.svelte-1s9jqu8:not([open]){pointer-events:none;opacity:0}dialog.svelte-1s9jqu8::backdrop{transition:background-color 0.25s ease}dialog.modal.svelte-1s9jqu8::backdrop{background-color:var(--br-dark, rgba(50,50,50,0.5)) var(--br-light, rgba(0,0,0,0.5));opacity:1}@media(prefers-color-scheme: dark){dialog.modal.svelte-1s9jqu8::backdrop{background-color:rgba(50,50,50,0.5)}}@media(prefers-color-scheme: light){dialog.modal.svelte-1s9jqu8::backdrop{background-color:rgba(0,0,0,0.5)}}:root[data-br-color-scheme=dark] dialog.modal.svelte-1s9jqu8::backdrop{background-color:rgba(50,50,50,0.5)}:root[data-br-color-scheme=light] dialog.modal.svelte-1s9jqu8::backdrop{background-color:rgba(0,0,0,0.5)}dialog.non-modal.svelte-1s9jqu8::backdrop{background-color:transparent}",
  map: null
};
const Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  createEventForwarder();
  let { context = void 0 } = $$props;
  let { open = false } = $$props;
  if ($$props.context === void 0 && $$bindings.context && context !== void 0)
    $$bindings.context(context);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  $$result.css.add(css$9);
  return `


<dialog${add_attribute("aria-hidden", !open, 0)} class="${[
    "svelte-1s9jqu8",
    (open === "modal" ? "modal" : "") + " " + (open === "non-modal" ? "non-modal" : "")
  ].join(" ").trim()}">${slots.default ? slots.default({ context, open }) : ``}
</dialog>`;
});
const css$8 = {
  code: ".missing.svelte-1vhz0i7{padding-inline:var(--br-size-5);opacity:0.75}",
  map: null
};
const Experiment_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let breadcrumbs;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { experiment } = $$props;
  let openToggle = false;
  function setDefaultOpen(experiment2, breadcrumbs2) {
    const breadcrumb = (
      /** @type {BreadcrumbExperiment | undefined} */
      breadcrumbs2[2]
    );
    openToggle = experiment2.id === breadcrumb?.id;
  }
  if ($$props.experiment === void 0 && $$bindings.experiment && experiment !== void 0)
    $$bindings.experiment(experiment);
  $$result.css.add(css$8);
  ({ breadcrumbs } = $page.data);
  {
    setDefaultOpen(experiment, breadcrumbs);
  }
  $$unsubscribe_page();
  return `${validate_component(Toggle_item, "Toggle").$$render(
    $$result,
    {
      href: "/experiment/" + experiment.id,
      open: openToggle,
      active: false
    },
    {},
    {
      default: () => {
        return `${escape(experiment.title)}`;
      }
    }
  )}
${openToggle ? `${validate_component(Section, "Section").$$render($$result, {}, {}, {
    default: () => {
      return `${experiment.slides.length ? each(experiment.slides, (slide) => {
        return `${validate_component(Link_item, "LinkItem").$$render($$result, { href: "/slide/" + slide.id }, {}, {
          default: () => {
            return `${slide.title ? `${escape(slide.title)}` : `Untitled slide`}
			`;
          }
        })}`;
      }) : `<div class="${"missing svelte-1vhz0i7"}">No slides or plates</div>`}`;
    }
  })}` : ``}`;
});
const css$7 = {
  code: ".missing.svelte-1vhz0i7{padding-inline:var(--br-size-5);opacity:0.75}",
  map: null
};
const Project_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let breadcrumbs;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { project } = $$props;
  let openToggle = false;
  function setDefaultOpen(project2, breadcrumbs2) {
    const breadcrumb = (
      /** @type {BreadcrumbProject | undefined} */
      breadcrumbs2[1]
    );
    openToggle = project2.id === breadcrumb?.id;
  }
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  $$result.css.add(css$7);
  ({ breadcrumbs } = $page.data);
  {
    setDefaultOpen(project, breadcrumbs);
  }
  $$unsubscribe_page();
  return `${validate_component(Toggle_item, "Toggle").$$render(
    $$result,
    {
      href: "/project/" + project.id,
      open: openToggle,
      active: false
    },
    {},
    {
      default: () => {
        return `${escape(project.title)}`;
      }
    }
  )}
${openToggle ? `${validate_component(Section, "Section").$$render($$result, {}, {}, {
    default: () => {
      return `${project.experiments.length ? each(project.experiments, (experiment) => {
        return `${validate_component(Experiment_item, "Experiment").$$render($$result, { experiment }, {}, {})}`;
      }) : `<div class="${"missing svelte-1vhz0i7"}">No experiments</div>`}`;
    }
  })}` : ``}`;
});
const css$6 = {
  code: ".br-list-item.svelte-1ms6aao{--br-list-item-padding-inline:var(--br-size-2)}a.svelte-1ms6aao,button.svelte-1ms6aao{display:flex;align-items:center}button.svelte-1ms6aao{--icon-size:20px}a.svelte-1ms6aao{display:block;flex:1}.active.svelte-1ms6aao:not([aria-current]):not([aria-selected]){background-color:var(--br-light, rgb(240, 240, 240)) var(--br-dark, #333)}.active.svelte-1ms6aao:not([aria-current]):not([aria-selected]):hover{background-color:var(--br-light, rgb(230, 230, 230)) var(--br-dark, #555)}",
  map: null
};
const Toggle_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let current;
  let selected;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { active = false } = $$props;
  let { href } = $$props;
  let { open } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  $$result.css.add(css$6);
  current = $page.url.pathname === href ? "page" : null;
  selected = current ? "true" : null;
  $$unsubscribe_page();
  return `<div class="${["br-list-item svelte-1ms6aao", active ? "active" : ""].join(" ").trim()}"${add_attribute("aria-selected", selected, 0)}><button class="${"br-ignore unbutton svelte-1ms6aao"}">${open ? `${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiChevronDown }, {}, {})}` : `${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiChevronRight }, {}, {})}`}</button>
	<a${add_attribute("href", href, 0)}${add_attribute("aria-current", current, 0)} class="${"overflow-ellipsis svelte-1ms6aao"}">${slots.default ? slots.default({}) : ``}</a>
</div>`;
});
const File = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { value = void 0 } = $$props;
  let { multiple = false } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  return `<label><input type="${"file"}" ${multiple ? "multiple" : ""}${add_attribute("name", name, 0)}>
	${slots.default ? slots.default({}) : ``}</label>`;
});
const css$5 = {
  code: ".wrapper.svelte-b2sn8y{display:contents}.active.svelte-b2sn8y{display:inline-block}.br-container.svelte-b2sn8y{display:flex;border:var(--br-input-container-border);border-radius:var(--br-input-container-border-radius);background-color:var(--br-input-container-background-color);transition:var(--br-input-container-transition);position:var(--br-input-container-position, relative)}.br-container.svelte-b2sn8y:hover:not(:focus-within){box-shadow:var(--br-input-container-hover-box-shadow);border:var(--br-input-container-hover-border)}.br-container.svelte-b2sn8y:focus-within{box-shadow:var(--br-input-container-focus-box-shadow);border:var(--br-input-container-focus-border)}.br-container.svelte-b2sn8y input,.br-container.svelte-b2sn8y select{border:none;outline:0;padding-block:var(--br-input-padding-block);padding-inline:var(--br-input-padding-inline);color:var(--br-input-font-color);height:var(--br-input-container-inner-height);background-color:transparent;flex-grow:1;color:inherit}.br-container.svelte-b2sn8y option{color:black}.br-container.svelte-b2sn8y input::-webkit-datetime-edit{display:contents}.br-container.svelte-b2sn8y input::-webkit-datetime-edit-fields-wrapper{flex-grow:1}.br-container.svelte-b2sn8y input::-webkit-calendar-picker-indicator{padding-inline:0;margin-inline-start:8px;width:20px;height:20px;cursor:pointer}.br-container.svelte-b2sn8y [type=number]::-webkit-outer-spin-button,.br-container.svelte-b2sn8y [type=number]::-webkit-inner-spin-button{appearance:none;margin:0}.br-container.svelte-b2sn8y [type=number]{appearance:textfield}.br-container.svelte-b2sn8y textarea{border:none;outline:0;padding-block:var(--br-input-padding-block);padding-inline:var(--br-input-padding-inline);background-color:transparent;color:inherit;flex-grow:1;overflow:auto;overflow-x:hidden;-ms-overflow-style:none;resize:none}",
  map: null
};
const Container = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  const hintId = uid();
  const inputId = uid();
  let input;
  let validationMessage = "";
  createEventForwarder();
  $$result.css.add(css$5);
  return `



<div class="${["wrapper svelte-b2sn8y", $$slots.label || $$slots.hint ? "active" : ""].join(" ").trim()}">${slots.label ? slots.label({
    hintId,
    input,
    inputId,
    validationMessage
  }) : ``}
	<div class="${"br-container svelte-b2sn8y"}">${slots.default ? slots.default({
    hintId,
    input,
    inputId,
    validationMessage
  }) : ``}</div>
	${slots.hint ? slots.hint({
    hintId,
    input,
    inputId,
    validationMessage
  }) : ``}
</div>`;
});
const css$4 = {
  code: "label.svelte-tx5a19{display:grid;grid-template-columns:1fr max-content;align-items:center}.error.svelte-tx5a19{color:hsl(0, 100%, 50%);padding-block:var(--br-size-2)}.required.svelte-tx5a19{color:hsl(0, 100%, 50%);--icon-size:var(--br-size-4)}div[slot=hint].svelte-tx5a19:empty{display:none}",
  map: null
};
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form = void 0 } = $$props;
  let { label } = $$props;
  let { name } = $$props;
  let { placeholder = "" } = $$props;
  let { required = false } = $$props;
  createEventForwarder();
  const fieldErrors = getContext("field-errors");
  let latestError = "";
  onDestroy(fieldErrors.subscribe((errors) => {
    latestError = errors[name]?.[0] || "";
  }));
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  $$result.css.add(css$4);
  return `${validate_component(Container, "Container").$$render($$result, {}, {}, {
    hint: ({ inputId, hintId }) => {
      return `<div${add_attribute("id", hintId, 0)} slot="${"hint"}" class="${"svelte-tx5a19"}">${latestError ? `<div class="${"error svelte-tx5a19"}">${escape(latestError)}</div>` : ``}</div>`;
    },
    label: ({ inputId, hintId }) => {
      return `<label slot="${"label"}"${add_attribute("for", inputId, 0)} class="${"svelte-tx5a19"}">${escape(label)}
		<span class="${"required svelte-tx5a19"}">${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiAsterisk }, {}, {})}</span></label>`;
    },
    default: ({ inputId, hintId }) => {
      return `<select${add_attribute("id", inputId, 0)}${add_attribute("aria-describedby", hintId, 0)}${add_attribute("form", form, 0)}${add_attribute("name", name, 0)} ${required ? "required" : ""}${add_attribute("placeholder", placeholder, 0)}>${placeholder ? `<option value="${""}" disabled selected>${escape(placeholder)}</option>` : ``}${slots.default ? slots.default({}) : ``}</select>`;
    }
  })}`;
});
const css$3 = {
  code: "form.svelte-k4fykn{display:contents;--br-dialog-root-padding-inline:0}section.svelte-k4fykn{min-width:min(400px, 90vw)}h3.svelte-k4fykn{font-weight:normal;line-height:1}.errors.svelte-k4fykn{background-color:var(--br-dark, hsl(0, 100%, 90%)) var(--br-light, hsl(0, 100%, 95%));color:hsl(0, 100%, 50%);border-radius:var(--br-global-border-radius);margin-inline:var(--br-size-5);padding-inline:var(--br-size-4);min-width:calc(min(400px, 90vw) - var(--br-size-5) * 2)}",
  map: null
};
const Dialogform = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_fieldErrors;
  let { action } = $$props;
  let { enctype = void 0 } = $$props;
  let { open } = $$props;
  let { header } = $$props;
  let { size = "wide" } = $$props;
  let formErrors = [];
  const fieldErrors = writable(
    /** @type {Record<string, string[]>} */
    {}
  );
  $$unsubscribe_fieldErrors = subscribe(fieldErrors, (value) => value);
  setContext("field-errors", fieldErrors);
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  if ($$props.enctype === void 0 && $$bindings.enctype && enctype !== void 0)
    $$bindings.enctype(enctype);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.header === void 0 && $$bindings.header && header !== void 0)
    $$bindings.header(header);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  $$result.css.add(css$3);
  $$unsubscribe_fieldErrors();
  return `<div style="display: contents; --br-dialog-root-max-inline-size:${escape(size === "wide" ? "90vw" : "", true)};">${validate_component(Dialog, "Dialog").$$render($$result, { open: open ? "modal" : false }, {}, {
    default: () => {
      return `
	${open ? `<form${add_attribute("action", action, 0)} method="${"POST"}"${add_attribute("enctype", enctype, 0)} class="${"svelte-k4fykn"}"><header class="${"br-dialog-inline-section"}"><h3 class="${"svelte-k4fykn"}">${escape(header)}</h3></header>
			${formErrors.length ? `<section class="${"errors br-dialog-block-section svelte-k4fykn"}">${each(formErrors, (error) => {
        return `${escape(error)}`;
      })}</section>` : ``}
			<section class="${"br-dialog-block-section svelte-k4fykn"}">${slots.default ? slots.default({ fieldErrors }) : ``}</section>
			${slots.footer ? slots.footer({ fieldErrors }) : `
				<footer class="${"br-dialog-inline-section"}"><button class="${"br-button-primary"}">Save
					</button>
					<button type="${"reset"}">Cancel
					</button></footer>
			`}</form>` : ``}`;
    }
  })}</div>`;
});
const css$2 = {
  code: ".group.svelte-15t7356.svelte-15t7356{display:flex;flex-direction:column}.error.svelte-15t7356.svelte-15t7356{color:hsl(0, 100%, 50%);padding-block:var(--br-size-2)}.required.svelte-15t7356.svelte-15t7356{color:var(--br-dark, hsl(225deg, 100%, 70%)) var(--br-light, hsl(225deg, 100%, 55%))}.hint-wrapper.svelte-15t7356.svelte-15t7356:empty{display:none}.required.svelte-15t7356.svelte-15t7356{max-height:0;opacity:0;overflow:hidden;transition:opacity .25s ease, max-height .5s ease-in}.br-container:has(:placeholder-shown:focus)+.hint-wrapper.svelte-15t7356>.required.svelte-15t7356,.br-container:has(select:invalid:focus)+.hint-wrapper.svelte-15t7356>.required.svelte-15t7356{max-height:40px;opacity:1;padding-block:var(--br-size-2)}",
  map: null
};
const Group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $nameStore, $$unsubscribe_nameStore;
  let { label } = $$props;
  let { name } = $$props;
  let { required = false } = $$props;
  const groupId = uid();
  const hintId = uid();
  const nameStore = writable(name);
  $$unsubscribe_nameStore = subscribe(nameStore, (value) => $nameStore = value);
  createEventDispatcher();
  setContext("group-hint-id", hintId);
  setContext("group-name", nameStore);
  const fieldErrors = getContext("field-errors");
  let latestError = "";
  onDestroy(fieldErrors.subscribe((errors) => {
    latestError = errors[name]?.[0] || "";
  }));
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  $$result.css.add(css$2);
  set_store_value(nameStore, $nameStore = name, $nameStore);
  $$unsubscribe_nameStore();
  return `<div class="${"group svelte-15t7356"}" role="${"radiogroup"}"${add_attribute("aria-labelledby", groupId, 0)}><div${add_attribute("id", groupId, 0)}>${escape(label)}</div>
	<div class="${"inputs"}">${slots.default ? slots.default({}) : ``}</div>
	<div${add_attribute("id", hintId, 0)} class="${"hint-wrapper svelte-15t7356"}">${latestError ? `<div class="${"error svelte-15t7356"}">${escape(latestError)}</div>` : `<div class="${"required svelte-15t7356"}">This field is ${escape(required ? "required" : "optional")}</div>`}</div>
</div>`;
});
const css$1 = {
  code: "label.svelte-1py7ytf.svelte-1py7ytf{display:grid;grid-template-columns:1fr max-content;align-items:center}.error.svelte-1py7ytf.svelte-1py7ytf{color:hsl(0, 100%, 50%);padding-block:var(--br-size-2)}.required.svelte-1py7ytf.svelte-1py7ytf{color:var(--br-dark, hsl(225deg, 100%, 70%)) var(--br-light, hsl(225deg, 100%, 55%))}div[slot=hint].svelte-1py7ytf.svelte-1py7ytf:empty{display:none}.required.svelte-1py7ytf.svelte-1py7ytf{max-height:0;opacity:0;overflow:hidden;transition:opacity .25s ease, max-height .5s ease-in}.br-container:has(:placeholder-shown:focus)+div[slot=hint].svelte-1py7ytf>.required.svelte-1py7ytf,.br-container:has(select:invalid:focus)+div[slot=hint].svelte-1py7ytf>.required.svelte-1py7ytf{max-height:40px;opacity:1;padding-block:var(--br-size-2)}",
  map: null
};
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form = void 0 } = $$props;
  let { label } = $$props;
  let { max = void 0 } = $$props;
  let { min = void 0 } = $$props;
  let { name } = $$props;
  let { placeholder = "" } = $$props;
  let { required = false } = $$props;
  let { type = "text" } = $$props;
  let { value = "" } = $$props;
  createEventForwarder();
  const fieldErrors = getContext("field-errors");
  let latestError = "";
  onDestroy(fieldErrors.subscribe((errors) => {
    latestError = errors[name]?.[0] || "";
  }));
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css$1);
  return `${validate_component(Container, "Container").$$render($$result, {}, {}, {
    hint: ({ inputId, hintId }) => {
      return `<div${add_attribute("id", hintId, 0)} slot="${"hint"}" class="${"svelte-1py7ytf"}">${latestError ? `<div class="${"error svelte-1py7ytf"}">${escape(latestError)}</div>` : `<div class="${"required svelte-1py7ytf"}">This field is ${escape(required ? "required" : "optional")}</div>`}</div>`;
    },
    label: ({ inputId, hintId }) => {
      return `<label slot="${"label"}"${add_attribute("for", inputId, 0)} class="${"svelte-1py7ytf"}">${escape(label)}</label>`;
    },
    default: ({ inputId, hintId }) => {
      return `${type === "text" ? `<input${add_attribute("id", inputId, 0)}${add_attribute("aria-describedby", hintId, 0)}${add_attribute("form", form, 0)}${add_attribute("name", name, 0)}${add_attribute("placeholder", placeholder, 0)} ${required ? "required" : ""}${add_attribute("value", value, 0)}>` : `${type === "textarea" ? `<textarea${add_attribute("id", inputId, 0)}${add_attribute("aria-describedby", hintId, 0)}${add_attribute("form", form, 0)}${add_attribute("name", name, 0)}${add_attribute("placeholder", placeholder, 0)} ${required ? "required" : ""} rows="${"1"}">${escape(value, true)}</textarea>` : `${type === "number" ? `<input${add_attribute("id", inputId, 0)}${add_attribute("aria-describedby", hintId, 0)}${add_attribute("form", form, 0)}${add_attribute("name", name, 0)}${add_attribute("placeholder", placeholder, 0)} ${required ? "required" : ""}${add_attribute("value", value, 0)} type="${"number"}">` : `${type === "date" ? `<input${add_attribute("id", inputId, 0)}${add_attribute("aria-describedby", hintId, 0)}${add_attribute("form", form, 0)}${add_attribute("max", max, 0)}${add_attribute("min", min, 0)}${add_attribute("name", name, 0)}${add_attribute("placeholder", placeholder, 0)} ${required ? "required" : ""}${add_attribute("value", value, 0)} type="${"date"}">` : ``}`}`}`}`;
    }
  })}`;
});
const Radio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $name, $$unsubscribe_name;
  let { form = void 0 } = $$props;
  let { checked = false } = $$props;
  let { label } = $$props;
  let { required = false } = $$props;
  let { value } = $$props;
  createEventForwarder();
  const hintId = getContext("group-hint-id") || "";
  const name = getContext("group-name");
  $$unsubscribe_name = subscribe(name, (value2) => $name = value2);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$unsubscribe_name();
  return `<label><input${add_attribute("aria-describedby", hintId, 0)} ${checked ? "checked" : ""}${add_attribute("form", form, 0)}${add_attribute("name", $name, 0)} ${required ? "required" : ""}${add_attribute("value", value, 0)} type="${"radio"}">
	${escape(label)}</label>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".layout.svelte-164iaxe{height:100%;display:flex;flex-direction:column}.layout.svelte-164iaxe{--viewport-margin:var(--br-size-10)}.content.svelte-164iaxe{display:grid;grid-template-columns:max-content 1fr;gap:var(--br-size-10);height:100%}.br-sidebar.svelte-164iaxe{width:var(--br-size-17);--br-list-item-height:var(--br-size-8);--br-sidebar-section-indent:var(--br-size-4);padding-block:var(--br-size-4)}main.svelte-164iaxe{margin-right:var(--viewport-margin);display:flex;flex-direction:column;min-width:0}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let createExperimentDisabledHint;
  let createSlideDisabledHint;
  let { data } = $$props;
  let openProjectsModal;
  let project;
  let projectOp;
  function promptProject(op, toEdit) {
    projectOp = op;
    project = toEdit;
    openProjectsModal = true;
  }
  let openExperimentsModal;
  let experiment;
  let experimentOp;
  function promptExperiment(op, toEdit) {
    experimentOp = op;
    experiment = toEdit;
    openExperimentsModal = true;
  }
  let openSlideModal;
  let slide;
  let slideOp;
  function promptSlide(op, toEdit) {
    slideOp = op;
    slide = toEdit;
    openSlideModal = true;
  }
  let openCreateCoverslipModal;
  let coverslipSlideId;
  function createCoverslip(slideId) {
    openCreateCoverslipModal = true;
    coverslipSlideId = slideId;
  }
  let openCreateStainingModal;
  let stainingCoverslipId;
  function createStaining(coverslipId) {
    openCreateStainingModal = true;
    stainingCoverslipId = coverslipId;
  }
  let openEditCoverslipModal;
  let coverslip;
  function editCoverslip(toEdit) {
    openEditCoverslipModal = true;
    coverslip = toEdit;
  }
  let openEditCoverslipsModal;
  let coverslipids;
  let slideid;
  function editCoverslips(toEdit, givenSlide) {
    openEditCoverslipsModal = true;
    coverslipids = toEdit;
    slideid = givenSlide;
  }
  let openEditCoverslipModal2;
  function editCoverslip2(toEdit) {
    openEditCoverslipModal2 = true;
    coverslip = toEdit;
  }
  let openEditStainingModal;
  let staining;
  function editStaining(toEdit) {
    openEditStainingModal = true;
    staining = toEdit;
  }
  let openDeleteExperimentModal;
  let experimentToDelete;
  function deleteExperiment(item) {
    experimentToDelete = item;
    openDeleteExperimentModal = true;
  }
  let openDeleteProjectModal;
  let projectToDelete;
  function deleteProject(item) {
    projectToDelete = item;
    openDeleteProjectModal = true;
  }
  let openDeleteSlideModal;
  let slideToDelete;
  function deleteSlide(item) {
    slideToDelete = item;
    openDeleteSlideModal = true;
  }
  let openDeleteCoverslipModal;
  let coverslipToDelete;
  function deleteCoverslip(item) {
    coverslipToDelete = item;
    openDeleteCoverslipModal = true;
  }
  let openDeleteStainingpModal;
  let stainingToDelete;
  function deleteStaining(item) {
    stainingToDelete = item;
    openDeleteStainingpModal = true;
  }
  let openDeleteCoverslipFileModal;
  let coverslipFileToDelete;
  function deleteFile(item) {
    coverslipFileToDelete = item;
    openDeleteCoverslipFileModal = true;
  }
  let openUploadCoverslipFileModal;
  let fileCoverslipId;
  function uploadCoverslipFiles(coverslipId) {
    openUploadCoverslipFileModal = true;
    fileCoverslipId = coverslipId;
  }
  const prompt = {
    createCoverslip,
    createStaining,
    deleteExperiment,
    deleteFile,
    deleteProject,
    deleteSlide,
    deleteCoverslip,
    deleteStaining,
    editCoverslip,
    editCoverslips,
    editCoverslip2,
    editStaining,
    experiment: promptExperiment,
    project: promptProject,
    slide: promptSlide,
    uploadCoverslipFiles
  };
  setContext("prompt", prompt);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    createExperimentDisabledHint = data.projectCount ? "" : "Create at least one project first.";
    createSlideDisabledHint = data.experimentCount ? "" : "Create at least one experiment first.";
    $$rendered = `<div class="${"layout svelte-164iaxe"}">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
	<div class="${"content svelte-164iaxe"}"><div class="${"br-sidebar svelte-164iaxe"}">${validate_component(Section, "Section").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
          trigger: () => {
            return `<button slot="${"trigger"}">${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiPlus }, {}, {})}Create New
					</button>`;
          },
          default: () => {
            return `${validate_component(Popup, "Popup").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Arrow, "Arrow").$$render($$result, {}, {}, {})}
						${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiClipboardTextMultipleOutline }, {}, {})}
							Project
						`;
                  }
                })}
						${validate_component(Button_item, "ButtonItem").$$render(
                  $$result,
                  {
                    disabledHint: createExperimentDisabledHint
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiTestTube }, {}, {})}
							Experiment
						`;
                    }
                  }
                )}
						${validate_component(Button_item, "ButtonItem").$$render($$result, { disabledHint: createSlideDisabledHint }, {}, {
                  default: () => {
                    return `${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiMirrorRectangle }, {}, {})}
							Slide
						`;
                  }
                })}`;
              }
            })}`;
          }
        })}`;
      }
    })}
			${validate_component(Section, "Section").$$render($$result, { title: "My projects" }, {}, {
      default: () => {
        return `${data.user ? `${data.projects.length ? each(data.projects, (project2) => {
          return `${validate_component(Project_item, "Item.Project").$$render($$result, { project: project2 }, {}, {})}`;
        }) : `${validate_component(Empty_list, "EmptyList").$$render($$result, {}, {}, {
          default: () => {
            return `Your projects will appear here when you add them
						`;
          }
        })}`}` : `${validate_component(Empty_list, "EmptyList").$$render($$result, {}, {}, {
          default: () => {
            return `Your projects will appear here when you sign in
					`;
          }
        })}`}`;
      }
    })}</div>
		<main class="${"svelte-164iaxe"}">${slots.default ? slots.default({}) : ``}</main></div></div>

${validate_component(Project_dialog, "Form.ProjectDialog").$$render(
      $$result,
      {
        op: projectOp,
        project,
        open: openProjectsModal
      },
      {
        open: ($$value) => {
          openProjectsModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Experiment_dialog, "Form.ExperimentDialog").$$render(
      $$result,
      {
        op: experimentOp,
        experiment,
        open: openExperimentsModal
      },
      {
        open: ($$value) => {
          openExperimentsModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Slide_dialog, "Form.SlideDialog").$$render(
      $$result,
      { op: slideOp, slide, open: openSlideModal },
      {
        open: ($$value) => {
          openSlideModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Edit_coverslip_dialog, "Form.EditCoverslipDialog").$$render(
      $$result,
      { coverslip, open: openEditCoverslipModal },
      {
        open: ($$value) => {
          openEditCoverslipModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Edit_coverslip_dialog2, "Form.EditCoverslipDialog2").$$render(
      $$result,
      { coverslip, open: openEditCoverslipModal2 },
      {
        open: ($$value) => {
          openEditCoverslipModal2 = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Edit_coverslips_dialog, "Form.EditCoverslipsDialog").$$render(
      $$result,
      {
        coverslipids,
        slideid,
        open: openEditCoverslipsModal
      },
      {
        open: ($$value) => {
          openEditCoverslipsModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Edit_staining_dialog, "Form.EditStainingDialog").$$render(
      $$result,
      { staining, open: openEditStainingModal },
      {
        open: ($$value) => {
          openEditStainingModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Create_coverslip_dialog, "Form.CreateCoverslipDialog").$$render(
      $$result,
      {
        slideId: coverslipSlideId,
        open: openCreateCoverslipModal
      },
      {
        open: ($$value) => {
          openCreateCoverslipModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Create_staining_dialog, "Form.CreateStainingDialog").$$render(
      $$result,
      {
        coverslipId: stainingCoverslipId,
        open: openCreateStainingModal
      },
      {
        open: ($$value) => {
          openCreateStainingModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Delete_experiment_dialog, "Form.DeleteExperimentDialog").$$render(
      $$result,
      {
        experiment: experimentToDelete,
        open: openDeleteExperimentModal
      },
      {
        open: ($$value) => {
          openDeleteExperimentModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Delete_project_dialog, "Form.DeleteProjectDialog").$$render(
      $$result,
      {
        project: projectToDelete,
        open: openDeleteProjectModal
      },
      {
        open: ($$value) => {
          openDeleteProjectModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Delete_slide_dialog, "Form.DeleteSlideDialog").$$render(
      $$result,
      {
        slide: slideToDelete,
        open: openDeleteSlideModal
      },
      {
        open: ($$value) => {
          openDeleteSlideModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Delete_coverslip_dialog, "Form.DeleteCoverslipDialog").$$render(
      $$result,
      {
        coverslip: coverslipToDelete,
        open: openDeleteCoverslipModal
      },
      {
        open: ($$value) => {
          openDeleteCoverslipModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Delete_staining_dialog, "Form.DeleteStainingDialog").$$render(
      $$result,
      {
        staining: stainingToDelete,
        open: openDeleteStainingpModal
      },
      {
        open: ($$value) => {
          openDeleteStainingpModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Delete_file_dialog, "Form.DeleteFileDialog").$$render(
      $$result,
      {
        file: coverslipFileToDelete,
        open: openDeleteCoverslipFileModal
      },
      {
        open: ($$value) => {
          openDeleteCoverslipFileModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Upload_coverslip_files_dialog, "Form.UploadCoverslipFilesDialog").$$render(
      $$result,
      {
        coverslipId: fileCoverslipId,
        open: openUploadCoverslipFileModal
      },
      {
        open: ($$value) => {
          openUploadCoverslipFileModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Layout as default
};
