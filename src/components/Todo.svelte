<script>
  export let todo;
  import { createEventDispatcher } from 'svelte';
  import { tick } from 'svelte';
  import { selectOnFocus } from '../action.js';
  const dispatch = createEventDispatcher();

  let editing = false;
  let name = todo.name;
  let nameEl;
  let editButtonPressed = false;

  function update(updatedTodo) {
    todo = { ...todo, ...updatedTodo };
    dispatch('update', todo);
  }

  function onCancel() {
    name = todo.name;
    editing = false;
  }

  function onSave() {
    update({ name: name });
    editing = false;
  }

  function onRemove() {
    dispatch('remove', todo);
  }

  function onEdit() {
    editButtonPressed = true;
    editing = true;
  }

  const focusEditButton = (node) => editButtonPressed && node.focus();

  function onToggle() {
    update({ completed: !todo.completed });
  }
</script>

<div class="stack-small">
  {#if editing}
    <form
      on:submit|preventDefault={onSave}
      class="stack-small"
      on:keydown={(e) => e.key === 'Escape' && onCancel()}>
      <div class="form-group">
        <label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
        <input
          use:selectOnFocus
          bind:value={name}
          bind:this={nameEl}
          type="text"
          id="todo-{todo.id}"
          autoComplete="off"
          class="todo-text" />
      </div>
      <div class="btn-group">
        <button class="btn todo-cancel" on:click={onCancel} type="button">
          Cancel<span class="visually-hidden">renaming {todo.name}</span>
        </button>
        <button
          class="btn btn__primary todo-edit"
          type="submit"
          disabled={!name}>
          Save<span class="visually-hidden">new name for {todo.name}</span>
        </button>
      </div>
    </form>
  {:else}
    <!-- markup for displaying todo: checkbox, label, Edit and Delete Button -->
    <div class="c-cb">
        <input type="checkbox" id="todo-{todo.id}"
          on:click={onToggle} checked={todo.completed}
        >
        <label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
      </div>
    <div class="btn-group">
      <button type="button" class="btn" on:click={onEdit} use:focusEditButton>
        Edit<span class="visually-hidden"> {todo.name}</span>
      </button>
      <button type="button" class="btn btn__danger" on:click={onRemove}>
        Delete<span class="visually-hidden"> {todo.name}</span>
      </button>
    </div>
  {/if}
</div>
