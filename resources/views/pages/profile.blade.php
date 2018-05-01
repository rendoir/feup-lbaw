@extends('layouts.app')

@section('title', 'Profile')

@section('content')

{{ csrf_field() }}
<label class="btn">Select Image<input type="file" name="image" hidden></label>
<button id="save_changes" class="btn btn-success">Save Changes</button>

@endsection
