@extends('layouts.app')

@section('title', 'Edit Profile')

@section('content')

{{ csrf_field() }}
<img class="profile_img" width="256" height="256">
<label class="btn">Select Image<input type="file" name="image" hidden></label>
<button id="save_changes" class="btn btn-success">Save Changes</button>

@endsection
